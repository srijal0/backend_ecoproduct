# 🌿 EcoHaven Backend API

A RESTful backend API for the **EcoHaven** sustainable marketplace. Built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**, the API powers user authentication, product management, order processing, and role-based admin functionality.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- dotenv
- CORS

---

## ✨ Features

### 👤 Authentication
- User Registration
- User Login (JWT Authentication)
- Protected Routes
- User Profile Management
- Change Password

### 🛍️ Products
- Product Listing
- Product Search
- Product Details
- Create Product (Admin)
- Update Product (Admin)
- Delete Product (Admin)

### 📦 Orders
- Place Orders
- View Order History
- Order Status Tracking
- Admin Order Management

### 👨‍💼 Admin Features
- Role-Based Access Control
- User Management
- Product Management
- Order Management

### 📁 File Uploads
- Product Image Upload
- User Avatar Upload

---

# 📁 Project Structure

```
backend_ecoproduct/
│
├── config/
├── controllers/
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── models/
├── routes/
├── uploads/
├── .env.example
├── server.js
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- MongoDB
- npm

## Installation

Clone the repository

```bash
git clone https://github.com/srijal0/backend_ecoproduct.git
```

Move into the project

```bash
cd backend_ecoproduct
```

Install dependencies

```bash
npm install
```

Create an environment file

```bash
cp .env.example .env
```

Configure your environment variables.

---

# 🔧 Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

CLIENT_ORIGIN=http://localhost:3000
```

> **Note:** Never commit your `.env` file to GitHub.

---

# ▶️ Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Backend API

```
http://localhost:5000
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Protected |
| PUT | /api/auth/profile | Protected |
| PUT | /api/auth/password | Protected |

---

## Products

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/products | Public |
| GET | /api/products/featured | Public |
| GET | /api/products/:id | Public |
| POST | /api/products | Admin |
| PUT | /api/products/:id | Admin |
| DELETE | /api/products/:id | Admin |

---

## Orders

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/orders | Protected |
| GET | /api/orders/my | Protected |
| GET | /api/orders | Admin |
| PUT | /api/orders/:id/status | Admin |

---

## Users

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/users | Admin |
| PUT | /api/users/:id/role | Admin |

---

## Upload

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | /api/upload/avatar | Protected |

---

# 🔒 Authentication

Protected endpoints require a valid JWT token.

```
Authorization: Bearer <your_token>
```

Admin routes require the authenticated user to have:

```
role: "admin"
```

---

# 🗄️ Database

EcoHaven uses **MongoDB** with **Mongoose ODM**.

Main collections include:

- Users
- Products
- Orders

---

# 🚀 Future Improvements

- Online payment gateway integration
- Email notifications
- Product reviews and ratings
- Discount coupons
- Analytics dashboard
- Cloud image storage

---

# 👨‍💻 Developer

**Shreejal Shrestha**

BSc (Hons) Computing

Softwarica College of IT & E-Commerce

---

# 📄 License

Copyright (c) 2026 Shreejal Shrestha

This project was created for educational purposes as part of a final-year college project. All rights reserved by the author.

Not intended for commercial redistribution without permission.