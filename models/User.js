// ecoproduct-backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone:    { type: String, default: "" },
    bio:      { type: String, default: "" },
    avatar:   { type: String, default: "" },
    // ✅ ADD THIS:
    address: {
      name:  { type: String, default: "" },
      phone: { type: String, default: "" },
      label: { type: String, default: "HOME" },
      line:  { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);