import express from "express";
import argon2 from "argon2";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import { allowRoles, requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const password =
    typeof req.body.password === "string" ? req.body.password : "";

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "That email is already registered." });
    }

    const passwordHash = await argon2.hash(password);

    // The public signup route always creates a member.
    const user = await User.create({ name, email, passwordHash });

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "That email is already registered." });
    }

    console.error("Signup route error:", error.message);
    return res.status(500).json({ message: "Could not create the account." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Enter your email and password.",
      });
    }

    const user = await User.findOne({ email }).select("+passwordHash");

    // Use the same hash field name that your User model uses.
    const passwordMatches =
      user && (await argon2.verify(user.passwordHash, password));

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Email or password is incorrect.",
      });
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Could not log in right now.",
    });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.get(
  "/admin-check",
  requireAuth,
  allowRoles("admin", "superadmin"),
  (req, res) => {
    res.json({ message: "Admin access confirmed." });
  },
);

export default router;
