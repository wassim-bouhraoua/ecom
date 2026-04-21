"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/app/data/products";

export default function Home() {
  const { addToCart } = useCart();

  const [message, setMessage] = useState("");
  const [list, setList] = useState<Product[]>([]);

  // 🔥 load products (with updated stock)
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    setList(stored);
  }, []);

  // 🎯 pick first 3 as featured
  const featuredProducts = list.slice(0, 3);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();

    if (message) return;
    if (product.stock === 0) return;

    addToCart(product);
    setMessage(`${product.name} added to cart`);

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-24">

      {/* TOAST */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

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

          <div className="flex gap-6 text-sm text-gray-400 pt-6">
            <p>🚚 Free Shipping</p>
            <p>🔒 Secure Payment</p>
            <p>⚡ Fast Delivery</p>
          </div>
        </div>

        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
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

                  {/* ✅ STOCK */}
                  <p
                    className={`text-xs font-medium ${
                      product.stock > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {product.stock > 0
                      ? `✔ In stock (${product.stock})`
                      : "Out of stock"}
                  </p>

                  {/* ✅ BUTTON */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0}
                    className={`w-full py-2 rounded-lg transition ${
                      product.stock > 0
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
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