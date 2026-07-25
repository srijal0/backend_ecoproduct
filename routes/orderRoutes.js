const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

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

// GET /api/orders/my — logged in user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

// GET /api/orders — ALL orders (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

// PUT /api/orders/:id/status — admin only
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["Processing", "Shipped", "Delivered", "Cancelled"];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order." });
  }
});

module.exports = router;