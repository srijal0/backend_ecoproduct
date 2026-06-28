// ecoproduct-backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

// POST /api/orders — create new order (requires login)
router.post("/", protect, async (req, res) => {
  try {
    const { items, subtotal, deliveryFee, total, paymentMethod } = req.body;

    const orderNumber = "ECO-" + Math.floor(10000 + Math.random() * 90000);

    const order = await Order.create({
      user: req.user._id,
      orderNumber,
      items,
      subtotal,
      deliveryFee: deliveryFee || 180,
      total,
      paymentMethod: paymentMethod || "esewa",
      status: "Processing",
    });

    res.status(201).json({ order });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Failed to create order." });
  }
});

// GET /api/orders/my — get logged in user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

module.exports = router;