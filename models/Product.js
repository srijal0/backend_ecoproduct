// ecoproduct-backend/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    price:        { type: Number, required: true },
    category:     { type: String, required: true },
    description:  { type: String, default: "" },
    images:       { type: [String], default: [] },
    badge:        { type: String, default: "" },
    rating:       { type: Number, default: 0 },
    reviews:      { type: Number, default: 0 },
    stock:        { type: Number, default: 0 },
    featured:     { type: Boolean, default: false },
    // ✅ ADD THESE 3 NEW FIELDS:
    types:        { type: [String], default: [] },
    colors:       { type: [String], default: [] },
    shippingNote: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);