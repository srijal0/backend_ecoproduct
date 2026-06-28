// ecoproduct-backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

// ── CORS ──
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ── ROUTES ── (loaded after middleware)
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// Add these lines in server.js
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

// ✅ Serve uploads folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Register upload route
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ── HEALTH CHECK ──
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EcoHaven API is running ✅" });
});

// ── 404 HANDLER ──
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ── GLOBAL ERROR HANDLER ──
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// ── CONNECT DB & START ──
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 Accepting requests from: ${process.env.CLIENT_ORIGIN || "http://localhost:3000"}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });