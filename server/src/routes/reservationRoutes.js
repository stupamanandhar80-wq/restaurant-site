import express from "express";
import Reservation from "../models/Reservation.js";
import {
  allowRoles,
  requireAuth,
  optionalAuth,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Guests and signed-in users can submit a request.
router.post("/", optionalAuth, async (req, res) => {
  try {
    const { name, email, date, time, guests } = req.body;
    const guestCount = Number(guests);

    if (!name?.trim() || !email?.trim() || !date || !time) {
      return res.status(400).json({
        message: "Please complete all reservation fields.",
      });
    }

    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 8) {
      return res.status(400).json({
        message: "The number of guests must be between 1 and 8.",
      });
    }

    const reservation = await Reservation.create({
      name,
      email,
      date,
      time,
      guests: guestCount,
      user: req.user?._id ?? null,
    });

    return res.status(201).json({
      message: "Reservation request received.",
      reservation,
    });
  } catch (error) {
    console.error("Reservation creation error:", error);

    return res.status(500).json({
      message: "Could not save the reservation request.",
    });
  }
});

// Only admins and superadmins can view all requests.
// Cancelled reservations remain in this list.
router.get(
  "/",
  requireAuth,
  allowRoles("admin", "superadmin"),
  async (req, res) => {
    try {
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      return res.json({ reservations });
    } catch (error) {
      console.error("Reservation list error:", error);

      return res.status(500).json({
        message: "Could not load reservations.",
      });
    }
  },
);

//permanently deletes all cancelled requests
router.delete(
  "/cancelled",
  requireAuth,
  allowRoles("admin", "superadmin"),
  async (req, res) => {
    try {
      const result = await Reservation.deleteMany({
        status: "cancelled",
      });

      return res.json({
        message: `${result.deletedCount} cancelled request(s) deleted.`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error("Delete cancelled reservations error:", error);

      return res.status(500).json({
        message: "Could not delete cancelled requests.",
      });
    }
  },
);

// Signed-in users can see their own reservations.
// Cancelled ones are returned for 30 minutes, then hidden from this list.
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

    const reservations = await Reservation.find({
      user: req.user._id,
      $or: [
        { status: { $ne: "cancelled" } },
        { cancelledAt: { $gt: thirtyMinutesAgo } },
      ],
    }).sort({ createdAt: -1 });

    return res.json({ reservations });
  } catch (error) {
    console.error("Could not load member reservations:", error);

    return res.status(500).json({
      message: "Could not load your reservations.",
    });
  }
});

// A member can cancel their own pending reservation.
router.patch("/:id/cancel", requireAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    if (reservation.status !== "pending") {
      return res.status(400).json({
        message: "Only pending reservations can be cancelled.",
      });
    }

    reservation.status = "cancelled";
    reservation.cancelledAt = new Date();
    await reservation.save();

    return res.json({
      message: "Reservation cancelled.",
      reservation,
    });
  } catch (error) {
    console.error("Could not cancel reservation:", error);

    return res.status(500).json({
      message: "Could not cancel this reservation.",
    });
  }
});

export default router;
