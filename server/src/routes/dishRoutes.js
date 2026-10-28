import express from "express";
import multer from "multer";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

import Dish from "../models/Dish.js";
import { allowRoles, requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save uploaded images in server/uploads/dishes.
const uploadDirectory = fileURLToPath(
  new URL("../../uploads/dishes/", import.meta.url),
);

mkdirSync(uploadDirectory, { recursive: true });

const allowedImageTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, uploadDirectory);
    },
    filename: (_req, file, callback) => {
      const extension = allowedImageTypes[file.mimetype];
      callback(null, `${randomUUID()}${extension}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum size: 5 MB
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedImageTypes[file.mimetype]) {
      return callback(new Error("Choose a JPG, PNG, or WebP image."));
    }

    callback(null, true);
  },
});

// Return upload errors as a readable response.
function receiveDishImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message || "Could not upload the image.",
      });
    }

    next();
  });
}

// Superadmins can review pending dishes.
router.get(
  "/pending",
  requireAuth,
  allowRoles("superadmin"),
  async (_req, res) => {
    try {
      const dishes = await Dish.find({ status: "pending" })
        .populate("submittedBy", "name email")
        .sort({ createdAt: -1 });

      return res.json({ dishes });
    } catch (error) {
      console.error("Pending dish list error:", error);

      return res.status(500).json({
        message: "Could not load pending dishes.",
      });
    }
  },
);

// Anyone can see approved dishes.
router.get("/", async (_req, res) => {
  try {
    const dishes = await Dish.find({ status: "approved" }).sort({
      category: 1,
      name: 1,
    });

    return res.json({ dishes });
  } catch (error) {
    console.error("Public dish list error:", error);

    return res.status(500).json({
      message: "Could not load the menu.",
    });
  }
});

// Admins and superadmins can submit a dish.
// New dishes remain pending until a superadmin reviews them.
router.post(
  "/",
  requireAuth,
  allowRoles("admin", "superadmin"),
  receiveDishImage,
  async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        price,
        vegetarian,
        ingredients,
        imageAlt,
      } = req.body;

      const numericPrice = Number(price);
      const vegetarianChoice = vegetarian === true || vegetarian === "true";

      if (
        !name?.trim() ||
        !description?.trim() ||
        !category?.trim() ||
        !imageAlt?.trim() ||
        !req.file ||
        !Number.isFinite(numericPrice) ||
        numericPrice <= 0 ||
        !["true", "false", true, false].includes(vegetarian)
      ) {
        return res.status(400).json({
          message:
            "Complete all fields, choose a vegetarian option, and upload an image.",
        });
      }

      // The form can send ingredients as a comma-separated string.
      const parsedIngredients = Array.isArray(ingredients)
        ? ingredients
            .map((ingredient) => String(ingredient).trim())
            .filter(Boolean)
        : String(ingredients || "")
            .split(",")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean);

      const dish = await Dish.create({
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        price: numericPrice,
        vegetarian: vegetarianChoice,
        ingredients: parsedIngredients,
        image: `/uploads/dishes/${req.file.filename}`,
        imageAlt: imageAlt.trim(),
        status: "pending",
        submittedBy: req.user._id,
      });

      return res.status(201).json({
        message: "Dish submitted for superadmin review.",
        dish,
      });
    } catch (error) {
      console.error("Dish submission error:", error);

      return res.status(500).json({
        message: "Could not submit the dish.",
      });
    }
  },
);

// Only a superadmin can approve or reject a pending dish.
router.patch(
  "/:id/review",
  requireAuth,
  allowRoles("superadmin"),
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          message: "Review status must be approved or rejected.",
        });
      }

      const dish = await Dish.findById(req.params.id);

      if (!dish) {
        return res.status(404).json({
          message: "Dish not found.",
        });
      }

      if (dish.status !== "pending") {
        return res.status(400).json({
          message: "Only pending dishes can be reviewed.",
        });
      }

      dish.status = status;
      dish.reviewedBy = req.user._id;
      dish.reviewedAt = new Date();

      await dish.save();

      return res.json({
        message: `Dish ${status}.`,
        dish,
      });
    } catch (error) {
      console.error("Dish review error:", error);

      return res.status(500).json({
        message: "Could not review the dish.",
      });
    }
  },
);

export default router;
