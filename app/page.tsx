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

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-20">

      {/* ✅ TOAST MESSAGE */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      {/* 🔥 HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            🛍️ My Store
          </h1>

          <p className="text-gray-400 text-lg">
            Discover amazing products at unbeatable prices.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <Link
              href="/product"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>

            <Link
              href="/cart"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100"
            >
              View Cart
            </Link>
          </div>

          {/* TRUST BADGES */}
          <div className="flex gap-6 text-sm text-gray-400 pt-4">
            <p>✅ Free Shipping</p>
            <p>🔒 Secure Payment</p>
            <p>⚡ Fast Delivery</p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl" />
        </div>
      </div>

      {/* 🔥 FEATURED PRODUCTS */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          🔥 Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>

              <div className="bg-white text-black rounded-xl overflow-hidden shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">

                <img
                  src={product.image}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <p className="font-semibold text-lg">
                    {product.name}
                  </p>

                  <p className="text-gray-500">
                    ${product.price}
                  </p>

                  {/* ADD TO CART */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();

                      if (message) return;

                      addToCart(product);

                      setMessage(`✅ ${product.name} added to cart`);

                      setTimeout(() => {
                        setMessage("");
                      }, 2000);
                    }}
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 active:scale-95 transition cursor-pointer"
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