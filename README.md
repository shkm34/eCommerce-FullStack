# 🛒 Vibe Commerce - Mock E-Commerce Cart

A full-stack shopping cart application built with **React**, **Node.js/Express**, **MongoDB**, and **Tailwind CSS** for Vibe Commerce screening assignment.

![Project Banner]()

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 🎯 Overview

This project implements a complete e-commerce shopping cart system with product browsing, cart management, checkout flow, and order history. It features a modern, responsive UI and follows best practices for full-stack development.

**Key Highlights:**
- RESTful API architecture with proper error handling
- Centralized service layer for API calls
- Context API for global state management
- Responsive design with Tailwind CSS
- Mock checkout without real payment integration
- Order history and detailed order views

---

## ✨ Features

### Frontend
- ✅ **Product Grid**: Browse 8+ products with images, prices, and descriptions
- ✅ **Add to Cart**: Add products with real-time cart badge updates
- ✅ **Cart Management**: Update quantities, remove items, view totals
- ✅ **Checkout Form**: Customer info validation (name, email)
- ✅ **Receipt Modal**: Order confirmation with all details
- ✅ **Order History**: View past orders and detailed receipts
- ✅ **Responsive Design**: Mobile-first design across all devices
- ✅ **Loading States**: Skeleton loaders and spinners for better UX
- ✅ **Toast Notifications**: Real-time feedback for user actions

### Backend
- ✅ **Products API**: Get all products with stock management
- ✅ **Cart APIs**: CRUD operations for cart items
- ✅ **Checkout API**: Process orders and generate receipts
- ✅ **Order APIs**: Retrieve order history and details
- ✅ **Stock Validation**: Prevent over-ordering with stock checks
- ✅ **Error Handling**: Comprehensive validation and error responses
- ✅ **MongoDB Integration**: Persistent data storage

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart server
- **ES Modules** - Modern JavaScript imports
- **Git** - Version control

---

## 📁 Project Structure
Commerce-Cart/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── Header.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── ProductSkeleton.jsx
│ │ │ ├── CartItem.jsx
│ │ │ ├── OrderCard.jsx
│ │ │ └── ReceiptModal.jsx
│ │ ├── pages/ # Page components
│ │ │ ├── ProductsPage.jsx
│ │ │ ├── CartPage.jsx
│ │ │ ├── CheckoutPage.jsx
│ │ │ ├── OrdersPage.jsx
│ │ │ └── OrderDetailsPage.jsx
│ │ ├── services/ # API service layer
│ │ │ ├── productService.js
│ │ │ ├── cartService.js
│ │ │ └── checkoutService.js
│ │ ├── context/ # React Context
│ │ │ └── CartContext.jsx
│ │ ├── config/ # Configuration
│ │ │ └── api.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .env
│ ├── package.json
│ ├── vite.config.js
│ └── tailwind.config.js
│
├── server/ # Backend Node.js/Express application
│ ├── config/ # Configuration files
│ │ ├── db.js
│ │ └── seed.js
│ ├── models/ # Mongoose schemas
│ │ ├── Product.js
│ │ ├── Cart.js
│ │ └── Order.js
│ ├── controllers/ # Route controllers
│ │ ├── productController.js
│ │ ├── cartController.js
│ │ └── checkoutController.js
│ ├── routes/ # API routes
│ │ ├── productRoutes.js
│ │ ├── cartRoutes.js
│ │ └── checkoutRoutes.js
│ ├── middleware/ # Custom middleware
│ │ └── errorHandler.js
│ ├── .env
│ ├── package.json
│ └── server.js
│
├── README.md
└── .gitignore


---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository

git clone https://github.com/shkm34/eCommerce-FullStack.git


### 2. Backend Setup

Navigate to server directory
cd server

Install dependencies
npm install

Create .env file (see Environment Variables section)
Add your MongoDB connection string
Seed database with mock products
npm run seed

Start development server
npm run dev

text

Server runs on: `http://localhost:5000`

### 3. Frontend Setup

Open new terminal and navigate to client directory
cd client

Install dependencies
npm install

Create .env file (see Environment Variables section)
Start development server
npm run dev

text

Client runs on: `http://localhost:5173`


### 4. Access Application

Open browser and navigate to: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`server/.env`)

PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibecommerce?retryWrites=true&w=majority
NODE_ENV=development

text

### Frontend (`client/.env`)

VITE_API_URL=http://localhost:5000/api

text

**Note:** 
- Replace MongoDB credentials with your own
- For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/vibecommerce`
- Never commit `.env` files to Git

---

## 📡 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart` | Add item to cart |
| GET | `/api/cart` | Get cart items |
| PUT | `/api/cart/:id` | Update cart item quantity |
| DELETE | `/api/cart/:id` | Remove item from cart |
| DELETE | `/api/cart` | Clear entire cart |

### Checkout & Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/checkout` | Process checkout |
| GET | `/api/checkout` | Get all orders |
| GET | `/api/checkout/:orderId` | Get order by ID |

### Example API Request

Add item to cart
curl -X POST http://localhost:5000/api/cart
-H "Content-Type: application/json"
-d '{"productId": "673c1234567890abcdef1234", "quantity": 2}'

## 📸 Screenshots

### Products Page
<img width="1886" height="954" alt="Screenshot 2025-11-08 220136" src="https://github.com/user-attachments/assets/72145495-ce0d-4530-8113-2c100444d36b" />
*Responsive product grid with add to cart functionality*

### Shopping Cart
<img width="1880" height="961" alt="Screenshot 2025-11-08 220154" src="https://github.com/user-attachments/assets/fc4fad57-6b2b-4cbd-b4a0-849fcb61ca89" />
*Cart management with quantity controls and order summary*

### Checkout Form
<img width="1883" height="956" alt="Screenshot 2025-11-08 220235" src="https://github.com/user-attachments/assets/5fa98e4b-76ba-4f3c-a33a-12b400d29030" />
*Customer information form with validation*

### Receipt Modal
<img width="1878" height="954" alt="Screenshot 2025-11-08 220328" src="https://github.com/user-attachments/assets/2acb16ec-f6b2-4ef6-86c0-f19152177e11" />

*Order confirmation with complete details*

### Order History
<img width="1878" height="954" alt="Screenshot 2025-11-08 220328" src="https://github.com/user-attachments/assets/af9aa7d2-3d55-42e2-8f32-ac5f6b0b1d93" />

*View past orders with expandable details*

### Mobile View
<img width="470" height="839" alt="Screenshot 2025-11-08 220100" src="https://github.com/user-attachments/assets/59ee9fc9-ccd0-4173-88ea-1b98d652acd8" />
<img width="477" height="854" alt="Screenshot 2025-11-08 220018" src="https://github.com/user-attachments/assets/cda42eda-78cc-44c8-8084-cef6ab1dc90d" />
<img width="475" height="836" alt="Screenshot 2025-11-08 220047" src="https://github.com/user-attachments/assets/c6f18920-898f-4481-9f75-dd609c0fa98d" />

*Fully responsive design for mobile devices*

---


## 🚀 Future Enhancements

- [ ] User authentication with JWT
- [ ] Real payment gateway integration (Stripe/Razorpay)
- [ ] Product search and filtering
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Admin dashboard for product management
- [ ] Email notifications for orders
- [ ] Order tracking system
- [ ] Multiple user carts (multi-tenant)
- [ ] Product image uploads to cloud storage

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 📄 License

This project is created for educational purposes as part of Vibe Commerce screening assignment.

---

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Heroicons](https://heroicons.com)
- Tailwind CSS for styling utilities
- MongoDB Atlas for cloud database hosting

---
