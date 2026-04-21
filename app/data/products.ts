export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
};

export const products: Product[] = [
  {
    id: "phone",
    name: "Phone",
    category: "phone",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    description: "A powerful smartphone with modern features.",
    stock: 8,
  },
  {
    id: "laptop",
    name: "Laptop",
    category: "laptop",
    price: 1000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    description: "High performance laptop for work and gaming.",
    stock: 9,
  },
  {
    id: "headphones",
    name: "Headphones",
    category: "audio",
    price: 100,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Noise-cancelling headphones with great sound.",
    stock: 15,
  },
  {
    id: "tablet",
    name: "Tablet",
    category: "phone",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Portable tablet for entertainment and work.",
    stock: 7,
  },
  {
    id: "smartwatch",
    name: "Smart Watch",
    category: "phone",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500",
    description: "Track your fitness and notifications on the go.",
    stock: 22,
  },
  {
    id: "keyboard",
    name: "Keyboard",
    category: "laptop",
    price: 80,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    description: "Mechanical keyboard with smooth typing experience.",
    stock: 12,
  },
  {
    id: "mouse",
    name: "Wireless Mouse",
    category: "laptop",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    description: "Ergonomic wireless mouse for everyday use.",
    stock: 0,
  },
  {
    id: "earbuds",
    name: "Earbuds",
    category: "audio",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    description: "Compact earbuds with premium sound quality.",
    stock: 18,
  },
];