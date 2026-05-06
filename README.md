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
│   │   └── route.ts              # backend: create + fetch orders
│   │
│   ├── products/
│   │   └── route.ts              # backend: return products
│   │
│   ├── users/
│   │   └── route.ts              # backend: create + fetch users
│   │
│   └── cart/
│       └── route.ts              # backend: save + fetch user cart
│
├── cart/
│   └── page.tsx                  # cart page
│
├── checkout/
│   └── page.tsx                  # checkout form + place order
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            # top navigation bar
│   │   ├── ProductCard.tsx       # reusable product card
│   │   ├── CartDrawer.tsx        # cart sidebar drawer
│   │   └── InitProducts.tsx      # optional product initialization
│ 
├── context/
│   ├── AuthContext.tsx           # frontend auth state + backend users API
│   └── CartContext.tsx           # frontend cart state + backend cart API
│
├── data/
│   ├── products.ts               # static products source
│   ├── orders.json               # persistent orders storage
│   ├── users.json                # persistent users storage
│   └── carts.json                # persistent carts storage
│
├── lib/
│   └── utils.ts                  # utility/helper functions
│
├── login/
│   └── page.tsx                  # login page
│
├── orders/
│   └── page.tsx                  # fetch + display user orders
│
├── product/
│   ├── [id]/
│   │   └── page.tsx              # dynamic product details page
│   │
│   └── page.tsx                  # all products page
│
├── thank-you/
│   └── page.tsx                  # success page after checkout
│
├── favicon.ico                   # browser icon
├── globals.css                   # global styles
├── layout.tsx                    # root layout
└── page.tsx                      # homepage


