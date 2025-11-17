# Elegant Vogue - E-Commerce Clothing Store

A full-stack MERN e-commerce application with Next.js frontend, Express backend, MongoDB database, and Razorpay payment integration.

## 🚀 Features

- **Authentication**: JWT + NextAuth with Google OAuth
- **Product Management**: Browse, filter, search products
- **Cart & Wishlist**: Real-time updates with Redux
- **Payment Integration**: Razorpay checkout
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Code splitting, lazy loading, caching

## 📦 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Redux Toolkit (State Management)
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Query (Data Fetching)
- Axios (HTTP Client)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Razorpay SDK

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Razorpay account (test mode)

### Setup

1. **Clone the repository**
```bash
git clone <your-repo>
cd MERN-ECOMMERCE-CLOTHES
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install server dependencies**
```bash
cd server
npm install
```

4. **Install client dependencies**
```bash
cd ../client
npm install
```

5. **Environment Variables**

Create `.env` in server folder:
```env

```

Create `.env.local` in client folder:
```env

```

6. **Seed Database with Products**
```bash
cd server
npm run seed
```

## 🎯 Running the Application

### Development Mode

From root directory:
```bash
npm run dev
```

This runs both frontend and backend concurrently.

Or run separately:

**Backend (Port 5000)**
```bash
cd server
npm run dev
```

**Frontend (Port 3000)**
```bash
cd client
npm run dev
```

### Production Build

```bash
cd client
npm run build
npm start
```

## 📁 Project Structure

```
MERN-ECOMMERCE-CLOTHES/
├── client/                 # Next.js Frontend
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── store/            # Redux store & slices
│   ├── lib/              # Utilities & configs
│   └── public/           # Static assets
├── server/                # Express Backend
│   ├── config/           # Database config
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── scripts/          # Seed scripts
├── Models/               # Original model files
├── images/              # Product images
└── products.json        # Product seed data
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `POST /api/products/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/toggle/:productId` - Toggle wishlist

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

## 🎨 UI Design

The UI is based on the Figma design provided, featuring:
- Minimalist black & white theme
- Grain texture backgrounds
- Modern typography (Beatrice Deck Trial font)
- Smooth animations and transitions
- Mobile-responsive layouts

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation
- XSS protection

## 📱 Pages

- **Home** (`/`) - Hero section, featured products
- **Products** (`/products`) - Product listing with filters
- **Product Detail** (`/products/[slug]`) - Single product view
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Payment & shipping
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration
- **Profile** (`/profile`) - User dashboard
- **Orders** (`/orders`) - Order history
- **Wishlist** (`/wishlist`) - Saved products

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Render/Railway)
- Push server folder to GitHub
- Connect to Render/Railway
- Add environment variables
- Deploy

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ using MERN Stack
