# 🌹 Sasthi Boutique — Luxury E-Commerce Website

A full-stack luxury e-commerce boutique for Indian ethnic wear, built with **Next.js 15**, **Node.js**, **MongoDB Atlas**, and **Tailwind CSS**.

## ✨ Features

### Customer-Facing
- 🎨 Luxury red & green animated UI with Cinzel/Cormorant fonts
- 🛍️ Full product catalog with category filtering, search, sort
- 🔍 Product image zoom, size/color selection, quantity picker
- 💖 Wishlist (persisted in localStorage)
- 🛒 Shopping cart with quantity management
- 📱 WhatsApp ordering — cart sends directly to WhatsApp
- 📦 Order form with address collection
- ⭐ Product ratings & reviews display
- 📱 100% mobile responsive
- ✨ Animations: marquee banner, hover effects, floating elements, fade-ins

### Admin Panel (`/admin`)
- 🔐 Secure JWT login
- 📊 Dashboard with stats (orders, revenue, products)
- 📋 Full orders management with status updates
- 🛒 Product CRUD (add, edit, delete, images)
- ⚙️ Settings page
- 📱 WhatsApp customer messaging from admin

## 🚀 Setup & Run

### 1. Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Edit `.env.local`:
```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/sasthi-boutique
JWT_SECRET=your-random-secret-32chars
WHATSAPP_NUMBER=919876543210          # Your WhatsApp with country code
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
ADMIN_EMAIL=admin@yourstore.com
ADMIN_PASSWORD=YourSecurePassword
```

### 4. Seed Database
```bash
node scripts/seed.js
```
This creates: 5 categories, 8 sample products, 1 admin user.

### 5. Run Development Server
```bash
npm run dev
```
Open: http://localhost:3000

### 6. Admin Panel
Visit: http://localhost:3000/admin/login
- Email: as set in ADMIN_EMAIL
- Password: as set in ADMIN_PASSWORD

## 🛠 Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Custom CSS |
| State | Zustand (cart, wishlist) |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas via Mongoose |
| Auth | JWT (bcryptjs) |
| Fonts | Cinzel + Cormorant Garamond |
| Icons | react-icons |
| Toasts | react-hot-toast |

## 📁 Project Structure
```
sasthi-boutique/
├── app/
│   ├── page.tsx              # Homepage
│   ├── shop/                 # Shop listing
│   │   └── [slug]/           # Product detail
│   ├── cart/                 # Cart page
│   ├── wishlist/             # Wishlist
│   ├── contact/              # Contact page
│   ├── about/                # About page
│   ├── (auth)/login/         # Admin login
│   ├── admin/                # Admin dashboard
│   │   ├── products/         # Product management
│   │   ├── orders/           # Order management
│   │   └── settings/         # Settings
│   └── api/                  # API routes
│       ├── products/
│       ├── orders/
│       ├── categories/
│       └── auth/
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── shop/                 # Hero, ProductCard, etc.
│   └── ui/                   # WhatsApp float, etc.
├── lib/
│   ├── db.ts                 # MongoDB connection
│   ├── auth.ts               # JWT utilities
│   └── store.ts              # Zustand cart store
├── models/                   # Mongoose models
└── scripts/
    └── seed.js               # Database seeder
```

## 🛍️ How WhatsApp Ordering Works
1. Customer browses and adds items to cart
2. On checkout, customer fills name, phone, address
3. Clicks "Order via WhatsApp"
4. Opens WhatsApp with pre-filled order message
5. Admin receives order, confirms, processes manually
6. Admin can send status updates from `/admin/orders`

## 🌐 Deploy to Vercel
```bash
npm run build
vercel --prod
```
Add env variables in Vercel dashboard.

## 📝 License
MIT — Built with ❤️ for Sasthi Boutique
