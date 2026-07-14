# EcoHaven Backend API

The EcoHaven Backend is a RESTful API built with Node.js, Express.js, MongoDB, and JWT Authentication. It provides secure authentication, product management, order management, profile updates, and file upload functionality for the EcoHaven sustainable marketplace.

---

## Features

- User Registration
- User Login (JWT Authentication)
- User Profile Management
- Change Password
- Product Management
- Product Search
- Order Management
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

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Current User |
| PUT | /api/auth/profile | Update Profile |
| PUT | /api/auth/password | Change Password |

---

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/:id |

---

### Orders

| Method | Endpoint |
|---------|----------|
| POST | /api/orders |
| GET | /api/orders/my |

---

### Upload

| Method | Endpoint |
|---------|----------|
| POST | /api/upload/avatar |

---

## Authentication

Protected routes require a JWT token.

```
Authorization: Bearer <your_token>
```

---

## Author

**Shreejal Shrestha**

BSc (Hons) Computing

Softwarica College of IT & E-Commerce