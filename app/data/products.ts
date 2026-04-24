// ✅ Product type
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  stock: number;
};

// ✅ helper
const getProductImages = (id: string) => [
  `/products/${id}/${id}1.webp`,
  `/products/${id}/${id}2.webp`,
  `/products/${id}/${id}3.webp`,
];

// ✅ products (FIXED)
export const products: Product[] = [
  {
    id: "phone",
    name: "Phone",
    category: "phone",
    price: 300,
    images: getProductImages("phone"),
    description: "A powerful smartphone with modern features.",
    stock: 0,
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "laptop",
    price: 1000,
    images: getProductImages("laptop"),
    description: "High performance laptop for work and gaming.",
    stock: 9,
  },
  {
    id: "headphones", // ✅ FIXED (was sony)
    name: "Headphones",
    category: "audio",
    price: 100,
    images: getProductImages("headphones"),
    description: "Noise-cancelling headphones with great sound.",
    stock: 15,
  },
  {
    id: "tablet", // ✅ FIXED (was tablette)
    name: "Tablet",
    category: "phone",
    price: 500,
    images: getProductImages("tablet"),
    description: "Portable tablet for entertainment and work.",
    stock: 7,
  },
  {
    id: "watch",
    name: "Smart Watch",
    category: "phone",
    price: 200,
    images: getProductImages("watch"),
    description: "Track your fitness and notifications.",
    stock: 22,
  },
  {
    id: "keyboard",
    name: "Keyboard",
    category: "laptop",
    price: 80,
    images: getProductImages("keyboard"),
    description: "Mechanical keyboard with smooth typing.",
    stock: 12,
  },
  {
    id: "mouse",
    name: "Wireless Mouse",
    category: "laptop",
    price: 50,
    images: getProductImages("mouse"),
    description: "Ergonomic wireless mouse.",
    stock: 0,
  },
  {
    id: "earbuds",
    name: "Earbuds",
    category: "audio",
    price: 120,
    images: getProductImages("earbuds"),
    description: "Compact wireless earbuds.",
    stock: 7,
  },
  {
    id: "monitor",
    name: "Monitor",
    category: "laptop",
    price: 400,
    images: getProductImages("monitor"),
    description: "Full HD monitor for work and gaming.",
    stock: 3,
  },
];