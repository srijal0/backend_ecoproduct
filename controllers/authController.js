// ecoproduct-backend/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || "",
  location: user.location || "",
  bio: user.bio || "",
  avatar: user.avatar || "",
  // ✅ ADD: include address in response
  address: user.address || { name: "", phone: "", label: "HOME", line: "" },
  createdAt: user.createdAt,
});

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters." });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ message: "An account with this email already exists." });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
    });

    const token = generateToken(user._id);
    res.status(201).json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user)
      return res.status(401).json({ message: "No account found with this email." });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Incorrect password." });

    const token = generateToken(user._id);
    console.log("Login successful:", user.email);
    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    // ✅ FIX: use req.user._id (from updated authMiddleware)
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user: safeUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// PUT /api/auth/profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, location, bio, avatar, address } = req.body;

    if (email) {
      const existing = await User.findOne({
        email: email.toLowerCase(),
        // ✅ FIX: use req.user._id
        _id: { $ne: req.user._id },
      });
      if (existing)
        return res.status(409).json({ message: "Email already in use." });
    }

    const updated = await User.findByIdAndUpdate(
      // ✅ FIX: use req.user._id
      req.user._id,
      {
        ...(name     && { name: name.trim() }),
        ...(email    && { email: email.toLowerCase().trim() }),
        ...(phone    !== undefined && { phone }),
        ...(location !== undefined && { location }),
        ...(bio      !== undefined && { bio }),
        ...(avatar   !== undefined && { avatar }),
        // ✅ ADD: save address
        ...(address  !== undefined && { address }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "User not found." });
    res.json({ user: safeUser(updated) });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error updating profile." });
  }
};

// PUT /api/auth/password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Both passwords are required." });

    if (newPassword.length < 6)
      return res.status(400).json({ message: "New password must be at least 6 characters." });

    // ✅ FIX: use req.user._id
    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found." });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(401).json({ message: "Current password is incorrect." });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { register, login, getMe, updateProfile, changePassword };