# 🛍️ My Store

A modern e-commerce web app built with Next.js.  
Browse products, view details, and manage your cart — all in a clean and simple interface.

---

## 🌍 Live Demo

👉 https://ecom-chi-puce.vercel.app/

---

## 🚀 Features

- 🛒 Add products to cart  
- 📦 View product details  
- 🔄 Dynamic routing (product pages)  
- ⚡ Fast performance with Next.js  
- 🎨 Clean and responsive UI  

---

## 🛠️ Tech Stack

- Next.js  
- React  
- TypeScript  
- Tailwind CSS  

---

## 📁 Project Structure

```bash
app/
├── api/
│   ├── orders/
│   │   └── route.ts          # backend: create + fetch orders
│   └── products/
│       └── route.ts          # backend: return products
│
├── cart/
│   └── page.tsx              # cart page (shows selected items)
│
├── checkout/
│   └── page.tsx              # checkout form + send order to API
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx        # top navigation bar
│   │   ├── ProductCard.tsx   # product UI card
│   │   ├── CartDrawer.tsx    # cart popup drawer
│   │   └── InitProducts.tsx  # initialize products (optional)
│
├── context/
│   ├── AuthContext.tsx       # login/user state
│   └── CartContext.tsx       # cart state (add/remove items)
│
├── data/
│   └── products.ts           # static product data (fallback)
│
├── login/
│   └── page.tsx              # login page (sets user)
│
├── orders/
│   └── page.tsx              # fetch + display orders from API
│
├── product/
│   ├── [id]/
│   │   └── page.tsx          # dynamic product details page
│   └── page.tsx              # all products page
│
├── thank-you/
│   └── page.tsx              # success page after checkout
│
├── favicon.ico               # browser icon
├── globals.css               # global styles
├── layout.tsx                # app layout (navbar wrapper)
└── page.tsx                  # homepage
