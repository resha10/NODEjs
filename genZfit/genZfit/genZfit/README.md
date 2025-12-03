# WoodLand E-Commerce Website

A modern, professional e-commerce platform for furniture shopping built with React and Node.js.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Product Management**: Browse products by category, search functionality
- **Shopping Cart**: Add, update, and remove items from cart
- **User Authentication**: Secure login and registration
- **Order Management**: Place orders with multiple payment options
- **Seller Dashboard**: Admin panel for managing products and orders
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (Image Upload)
- Stripe (Payment Processing)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- Stripe account (for payments)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Woodland-e-commerce
```

### 2. Backend Setup

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/woodland-ecommerce

# Server Configuration
PORT=7000

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:7000

# Currency Symbol
VITE_CURRENCY=$
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd Server
npm run dev
```

The server will run on `http://localhost:7000`

### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Woodland-e-commerce/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── Pages/         # Page components
│   │   ├── Context/       # React Context API
│   │   └── assets/        # Static assets
│   └── package.json
│
├── Server/                 # Node.js backend application
│   ├── Configs/           # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── Server.js         # Main server file
│
└── README.md
```

## 🎨 Features in Detail

### User Features
- Browse products by category
- Search products
- Add products to cart
- View product details
- Place orders
- Track orders
- Manage addresses
- User authentication

### Seller Features
- Seller dashboard
- Add/Edit products
- Manage product inventory
- View and manage orders
- Upload product images

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security.

## 💳 Payment Integration

Stripe is integrated for online payments. For development, use Stripe test keys.

## 📝 API Endpoints

### User Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/is-auth` - Check authentication status
- `GET /api/user/logout` - User logout

### Product Routes
- `GET /api/product/list` - Get all products
- `GET /api/product/:id` - Get product details
- `POST /api/product/add` - Add new product (Seller only)

### Cart Routes
- `POST /api/cart/update` - Update cart items

### Order Routes
- `POST /api/order/cod` - Place COD order
- `POST /api/order/stripe` - Place online payment order

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **Port Already in Use**
   - Change PORT in Server/.env
   - Change VITE_BACKEND_URL in client/.env accordingly

3. **CORS Errors**
   - Ensure backend CORS settings allow your frontend URL
   - Check Server/Server.js for CORS configuration

4. **Image Upload Issues**
   - Verify Cloudinary credentials
   - Check file size limits

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For support, email: support@woodlandfurniture.com

---

**Note**: This is a development version. Make sure to update all environment variables and secrets before deploying to production.

