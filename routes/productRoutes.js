const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    const query = {};

    if (category && category !== "All") query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    let sortObj = { createdAt: -1 };
    if (sort === "Price: Low to High") sortObj = { price: 1 };
    if (sort === "Price: High to Low") sortObj = { price: -1 };
    if (sort === "Top Rated") sortObj = { rating: -1 };

    const products = await Product.find(query).sort(sortObj);
    res.json({ products });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Error fetching products." });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured products." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product." });
  }
});

// POST /api/products — admin only
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id — admin only
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.json({ product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id — admin only
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product." });
  }
});

module.exports = router;