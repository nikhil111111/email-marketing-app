const express = require("express");

const authRoutes = require("../modules/auth/authRoutes");
const contactRoutes = require("../modules/contact/contactRoutes");

const router = express.Router();

// Health Check
router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Email Marketing API is running",
    timestamp: new Date().toISOString(),
  });
});

// Auth Routes
router.use("/auth", authRoutes);

// Contact Routes
router.use("/contacts", contactRoutes);

module.exports = router;