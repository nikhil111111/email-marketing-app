const express = require("express");

const authRoutes = require("../modules/auth/authRoutes");

const router = express.Router();

// Health Check
router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Email Marketing API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Auth Routes
router.use("/auth", authRoutes);

module.exports = router;