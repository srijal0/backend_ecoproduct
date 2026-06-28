// ecoproduct-backend/models/Order.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name:      { type: String, required: true },
  img:       { type: String, default: "" },
  price:     { type: Number, required: true },
  quantity:  { type: Number, required: true },
  selectedType:  { type: String, default: "" },
  selectedColor: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    user:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderNumber: { type: String, required: true, unique: true },
    items:       { type: [orderItemSchema], required: true },
    subtotal:    { type: Number, required: true },
    deliveryFee: { type: Number, default: 180 },
    total:       { type: Number, required: true },
    status:      { type: String, default: "Processing", enum: ["Processing", "Shipped", "Delivered", "Cancelled"] },
    paymentMethod: { type: String, default: "esewa" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);