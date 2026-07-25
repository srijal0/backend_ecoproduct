# EcoHaven Backend API

The EcoHaven Backend is a RESTful API built with Node.js, Express.js, MongoDB, and JWT Authentication. It provides secure authentication, role-based admin access, product management, order management, profile updates, and file upload functionality for the EcoHaven sustainable marketplace.

---

## Features

- User Registration
- User Login (JWT Authentication)
- Role-Based Access Control (customer / admin)
- User Profile Management
- Change Password
- Product Management (CRUD)
- Product Search
- Order Management & Status Tracking
- Admin Dashboard Endpoints (products, orders, users)
- Image Upload (Multer)
- MongoDB Database
- Protected API Routes
- REST API Architecture

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Multer
- dotenv
- CORS

---

## Project Structure

```
ecoproduct-backend/
│
├── config/
├── controllers/
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── models/
├── routes/
├── uploads/
├── .env
├── server.js
└── package.json
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/srijal0/security_backend.git
```

Move into the project

```bash
cd security_backend
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d

CLIENT_ORIGIN=http://localhost:3000
```

> **Note:** `.env` is gitignored and should never be committed. Rotate `MONGO_URI` credentials and `JWT_SECRET` if they are ever accidentally exposed.

---

## Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server runs on

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | /api/auth/register | Register User | Public |
| POST | /api/auth/login | Login User | Public |
| GET | /api/auth/me | Current User | Protected |
| PUT | /api/auth/profile | Update Profile | Protected |
| PUT | /api/auth/password | Change Password | Protected |

---

### Products

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| GET | /api/products | List / search products | Public |
| GET | /api/products/featured | Featured products | Public |
| GET | /api/products/:id | Product details | Public |
| POST | /api/products | Create product | Admin only |
| PUT | /api/products/:id | Update product | Admin only |
| DELETE | /api/products/:id | Delete product | Admin only |

---

### Orders

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | /api/orders | Create order | Protected |
| GET | /api/orders/my | Get logged-in user's orders | Protected |
| GET | /api/orders | Get all orders | Admin only |
| PUT | /api/orders/:id/status | Update order status | Admin only |

---

### Users

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| GET | /api/users | List all users | Admin only |
| PUT | /api/users/:id/role | Promote/demote user role | Admin only |

---

### Upload

| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| POST | /api/upload/avatar | Upload avatar image | Protected |

---

## Authentication

Protected routes require a JWT token.

```
Authorization: Bearer <your_token>
```

Admin-only routes additionally require the authenticated user's document to have `role: "admin"` set in MongoDB. New users default to `role: "user"`.

---

## Author

**Shreejal Shrestha**

BSc (Hons) Computing

Softwarica College of IT & E-Commerce