// ecoproduct-backend/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const upload = require("../config/upload");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

// POST /api/upload/avatar
router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // ✅ Build URL to access the file
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // ✅ Save URL to user in MongoDB
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: imageUrl },
      { new: true }
    ).select("-password");

    res.json({ url: imageUrl, user });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed." });
  }
});

module.exports = router;