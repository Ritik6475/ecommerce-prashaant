# Setup Guide - Elegant Vogue E-Commerce

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
cd ..
```

### Step 2: Environment Setup

Files are already created with credentials. Verify they exist:
- `server/.env` → Backend environment
- `client/.env.local` → Frontend environment

### Step 3: Seed Database

```bash
cd server
npm run seed
```

This will populate MongoDB with ~100+ products from `products.json`.

### Step 4: Run Application

From root directory:
```bash
npm run dev
```

Or run separately:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 5: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Test Accounts

### Razorpay Test Cards

Use these for testing payments:

**Successful Payment:**
- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card Number: `4000 0000 0000 0002`

---

## Common Issues & Fixes

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError`

**Fix:** Check if MongoDB URI is correct in `server/.env`:
```env
MONGODB_URI=mongodb+srv://chatUser:chatApp123@chatappcluster.wq5gj7d.mongodb.net/ecommerce-clothes
```

### Issue 2: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Fix:** Kill the process or change port:
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in server/.env
PORT=5001
```

### Issue 3: Module Not Found

**Error:** `Cannot find module 'express'`

**Fix:** Reinstall dependencies:
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Tailwind CSS Not Working

**Error:** Styles not applying

**Fix:** 
1. Check if `tailwind.config.js` exists in client folder
2. Restart dev server
3. Clear browser cache

---

## Features to Test

### 1. Authentication ✅
- Register new account
- Login with email/password
- View profile
- Logout

### 2. Product Browsing ✅
- Homepage product grid
- Filter by gender, category, price
- Search products
- Sort by price/rating

### 3. Cart & Wishlist ✅
- Add products to cart
- Update quantities
- Remove items
- Add to wishlist
- Toggle wishlist items

### 4. Checkout & Payment ✅
- Fill shipping address
- Razorpay integration
- Order creation
- Payment verification

### 5. Mobile Responsive ✅
- Test on mobile breakpoints
- Hamburger menu
- Touch interactions

---

## API Endpoints Reference

### Auth
- `POST /api/auth/register` → Register
- `POST /api/auth/login` → Login
- `GET /api/auth/me` → Get current user

### Products
- `GET /api/products` → List products
- `GET /api/products/:id` → Product details
- `GET /api/products/filters/options` → Filter options

### Cart
- `GET /api/cart` → Get cart
- `POST /api/cart` → Add to cart
- `PUT /api/cart/:itemId` → Update quantity
- `DELETE /api/cart/:itemId` → Remove item

### Orders
- `GET /api/orders` → User orders
- `POST /api/orders` → Create order
- `GET /api/orders/:id` → Order details

### Payment
- `POST /api/payment/create-order` → Create Razorpay order
- `POST /api/payment/verify` → Verify payment

---

## Deployment Guide

### Deploy Backend (Render)

1. Create new Web Service
2. Connect GitHub repo
3. Build Command: `cd server && npm install`
4. Start Command: `cd server && npm start`
5. Add environment variables

### Deploy Frontend (Vercel)

```bash
cd client
vercel --prod
```

Add environment variables in Vercel dashboard.

---

## Performance Optimization

The app includes:
- ✅ Code splitting (Next.js automatic)
- ✅ Image optimization (Next.js Image)
- ✅ Lazy loading components
- ✅ Redux for state management
- ✅ API response caching
- ✅ MongoDB indexing
- ✅ Debounced search

---

## Tech Stack Details

**Frontend:**
- Next.js 14 (App Router)
- React 18
- Redux Toolkit
- Tailwind CSS
- Axios
- Framer Motion

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Auth
- Razorpay SDK

**Database Schema:**
- Users (auth, cart, wishlist, orders)
- Products (images, prices, reviews, stock)
- Orders (items, payment, shipping)
- Reviews (ratings, comments)

---

## Next Steps

1. ✅ Test all features
2. ✅ Add products via seed script
3. ✅ Test Razorpay payment flow
4. 🔄 Customize branding/colors
5. 🔄 Add more products
6. 🔄 Deploy to production

---

## Support

For issues:
1. Check this guide
2. Review console errors
3. Check API responses in Network tab
4. Verify environment variables

Happy coding! 🚀
