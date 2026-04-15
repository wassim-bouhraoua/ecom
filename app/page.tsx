"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();

  const [message, setMessage] = useState("");

  const featuredProducts = [
    {
      id: "phone",
      name: "Phone",
      price: 300,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: "laptop",
      name: "Laptop",
      price: 1000,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
      id: "headphones",
      name: "Headphones",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
  ];

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();

    if (message) return;

    addToCart(product);
    setMessage(`✅ ${product.name} added to cart`);

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-24">

      {/* TOAST */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {message}
        </div>
      )}

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Shop Smart.
            <br />
            Shop Fast.
          </h1>

          <p className="text-gray-400 text-lg max-w-md">
            Discover high-quality tech products at unbeatable prices.
            Fast delivery, secure checkout, and great experience.
          </p>

          <div className="flex gap-4 pt-2">

            <Link
              href="/product"
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              Shop Now →
            </Link>

            <Link
              href="/cart"
              className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
            >
              View Cart
            </Link>

          </div>

          {/* TRUST */}
          <div className="flex gap-6 text-sm text-gray-400 pt-6">
            <p>🚚 Free Shipping</p>
            <p>🔒 Secure Payment</p>
            <p>⚡ Fast Delivery</p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            className="rounded-2xl shadow-xl group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
        </div>

      </div>

      {/* FEATURED */}
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Featured Products
          </h2>

          <Link
            href="/product"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>

              <div className="bg-white text-black rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition cursor-pointer">

                <img
                  src={product.image}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5 space-y-3">

                  <p className="font-semibold text-lg">
                    {product.name}
                  </p>

                  <p className="text-gray-500">
                    ${product.price}
                  </p>

                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}