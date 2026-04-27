// ✅ Product option type
export type ProductOption = {
  name: string;
  values: string[];
};

// ✅ Product type
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  stock: number;
  options?: ProductOption[]; // ✅ NEW
};

// ✅ helper
const getProductImages = (id: string) => [
  `/products/${id}/${id}1.webp`,
  `/products/${id}/${id}2.webp`,
  `/products/${id}/${id}3.webp`,
];

// ✅ products (UPGRADED WITH OPTIONS)
export const products: Product[] = [
  {
    id: "phone",
    name: "Phone",
    category: "phone",
    price: 300,
    images: getProductImages("phone"),
    description: "A powerful smartphone with modern features.",
    stock: 10,
    options: [
      { name: "Color", values: ["black", "orange", "white"] },
      { name: "Storage", values: ["256GB", "512GB", "1TB"] },
    ],
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "laptop",
    price: 1000,
    images: getProductImages("laptop"),
    description: "High performance laptop for work and gaming.",
    stock: 9,
    options: [
      { name: "Color", values: ["black", "grey"] },
      { name: "GPU", values: ["RTX 3050", "RTX 3060"] },
      { name: "Storage", values: ["512GB", "1TB"] },
    ],
  },
  {
    id: "headphones",
    name: "Headphones",
    category: "audio",
    price: 100,
    images: getProductImages("headphones"),
    description: "Noise-cancelling headphones with great sound.",
    stock: 15,
    options: [
      { name: "Color", values: ["black", "blue", "white"] },
    ],
  },
  {
    id: "tablet",
    name: "Tablet",
    category: "phone",
    price: 500,
    images: getProductImages("tablet"),
    description: "Portable tablet for entertainment and work.",
    stock: 7,
    options: [
      { name: "Keyboard", values: ["Yes", "No"] },
    ],
  },
  {
    id: "watch",
    name: "Smart Watch",
    category: "phone",
    price: 200,
    images: getProductImages("watch"),
    description: "Track your fitness and notifications.",
    stock: 22,
    options: [
      { name: "Color", values: ["black", "pink", "violet"] },
    ],
  },
  {
    id: "keyboard",
    name: "Keyboard",
    category: "laptop",
    price: 80,
    images: getProductImages("keyboard"),
    description: "Mechanical keyboard with smooth typing.",
    stock: 12,
    options: [
      { name: "Switch", values: ["blue", "red", "brown"] },
    ],
  },
  {
    id: "mouse",
    name: "Wireless Mouse",
    category: "laptop",
    price: 50,
    images: getProductImages("mouse"),
    description: "Ergonomic wireless mouse.",
    stock: 0,
    // ✅ no options
  },
  {
    id: "earbuds",
    name: "Earbuds",
    category: "audio",
    price: 120,
    images: getProductImages("earbuds"),
    description: "Compact wireless earbuds.",
    stock: 7,
    options: [
      { name: "Color", values: ["black", "white", "blue"] },
    ],
  },
  {
    id: "monitor",
    name: "Monitor",
    category: "laptop",
    price: 400,
    images: getProductImages("monitor"),
    description: "Full HD monitor for work and gaming.",
    stock: 3,
    options: [
      { name: "Size", values: ["24 inch", "27 inch", "32 inch"] },
    ],
  },
];