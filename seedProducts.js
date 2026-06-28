// ecoproduct-backend/seedProducts.js
// Run this ONCE to add products to your MongoDB:
// node seedProducts.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Product = require("./models/Product");

const products = [
  {
    name: "Organic Cotton Tee",
    price: 300,
    category: "Clothing",
    description: "Soft, breathable everyday tee made from 100% GOTS-certified organic cotton. Grown without synthetic pesticides and finished with low-impact dyes.",
    images: ["/images/image10.png"],
    badge: "ORGANIC",
    rating: 4.9,
    reviews: 124,
    stock: 50,
    featured: true,
    // ✅ NEW FIELDS
    types: ["Regular Fit", "Relaxed Fit"],
    colors: ["#2d4a2d", "#6b6b5e", "#c9b79c"],
    shippingNote: "Arrives soon!",
  },
  {
    name: "Linen Bedding Set",
    price: 350,
    category: "Bedding",
    description: "Stonewashed European flax linen, woven for breathability and softening with every wash. Includes one duvet cover and two pillowcases.",
    images: ["/images/image11.png"],
    badge: "",
    rating: 5.0,
    reviews: 88,
    stock: 30,
    featured: true,
    types: ["Single", "Double", "Queen"],
    colors: ["#4a7c59", "#3e3e3e", "#cfc7b8"],
    shippingNote: "Ships in 2-3 days",
  },
  {
    name: "Bamboo Brush",
    price: 300,
    category: "Accessories",
    description: "Charcoal-infused bristles set in a sustainably harvested bamboo handle. Gentle on skin, tough on grime, and fully compostable at end of life.",
    images: ["/images/image12.png"],
    badge: "",
    rating: 4.7,
    reviews: 42,
    stock: 100,
    featured: false,
    types: ["Soft Bristle", "Firm Bristle"],
    colors: ["#5c4a36"],
    shippingNote: "Arrives soon!",
  },
  {
    name: "Modern Ceramic Vase",
    price: 250,
    category: "Home Goods",
    description: "Hand-thrown stoneware vase with a matte glaze, fired in small batches by independent ceramicists. Each piece carries subtle variations in tone.",
    images: ["/images/image13.png"],
    badge: "BESTSELLER",
    rating: 4.8,
    reviews: 210,
    stock: 25,
    featured: true,
    types: ["Small", "Medium", "Large"],
    colors: ["#e7e2d8", "#4a4a44", "#8a7a63"],
    shippingNote: "Ships in 2-3 days",
  },
  {
    name: "Recycled Wool Slippers",
    price: 450,
    category: "Clothing",
    description: "Cozy slippers felted from reclaimed wool fibers, with a natural rubber sole for indoor-outdoor wear. Machine washable on a gentle cycle.",
    images: ["/images/image14.png"],
    badge: "",
    rating: 4.9,
    reviews: 56,
    stock: 40,
    featured: false,
    types: ["S", "M", "L"],
    colors: ["#8a7a63", "#3e3e3e"],
    shippingNote: "Arrives soon!",
  },
  {
    name: "Teak Serving Board",
    price: 220,
    category: "Home Goods",
    description: "Solid reclaimed teak, hand-oiled and finished with a juice groove. Sourced from salvaged plantation wood rather than newly felled timber.",
    images: ["/images/image15.png"],
    badge: "",
    rating: 4.6,
    reviews: 34,
    stock: 60,
    featured: false,
    types: ["Round", "Rectangular"],
    colors: ["#6b4a2d"],
    shippingNote: "Ships in 2-3 days",
  },
  {
    name: "Hemp Throw Blanket",
    price: 380,
    category: "Bedding",
    description: "Woven from hemp and organic cotton for a textured, breathable throw that softens beautifully over time. Naturally hypoallergenic.",
    images: ["/images/image16.png"],
    badge: "ORGANIC",
    rating: 4.8,
    reviews: 67,
    stock: 35,
    featured: false,
    types: ["Throw", "Queen Size"],
    colors: ["#4a7c59", "#cfc7b8", "#3e3e3e"],
    shippingNote: "Arrives soon!",
  },
  {
    name: "Rattan Side Table",
    price: 620,
    category: "Furniture",
    description: "Hand-woven rattan over a solid mango wood frame. Lightweight enough to move room to room, sturdy enough for daily use.",
    images: ["/images/image17.png"],
    badge: "",
    rating: 4.7,
    reviews: 29,
    stock: 15,
    featured: false,
    types: ["Natural", "Dark Stain"],
    colors: ["#a9824e", "#5c4a36"],
    shippingNote: "Ships in 5-7 days",
  },
  {
    name: "Beeswax Candle Set",
    price: 160,
    category: "Home Goods",
    description: "Pure beeswax candles that burn cleaner and longer than paraffin, with a subtle natural honey scent. Set of three in varying heights.",
    images: ["/images/image18.png"],
    badge: "NEW",
    rating: 5.0,
    reviews: 91,
    stock: 80,
    featured: true,
    types: ["Unscented", "Honey Scent"],
    colors: ["#d9b97a"],
    shippingNote: "Arrives soon!",
  },
  {
    name: "Reusable Glass Bottle",
    price: 500,
    category: "Accessories",
    description: "Borosilicate glass bottle with a removable bamboo lid and a protective silicone sleeve. Dishwasher safe and free of plastic aftertaste.",
    images: ["/images/image19.png"],
    badge: "",
    rating: 5.0,
    reviews: 128,
    stock: 75,
    featured: true,
    types: ["Bamboo Lid", "Steel Lid"],
    colors: ["#2d4a2d", "#5a5a3a", "#7a6a5a"],
    shippingNote: "Arrives soon!",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products successfully!`);

    inserted.forEach(p => console.log(`   • ${p.name} — Rs${p.price} [${p.category}]`));

    console.log("\n🎉 Database seeded! Check MongoDB Compass to see your products.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();