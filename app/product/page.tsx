"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function Page() {
  const { addToCart } = useCart();

  // 🔍 filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🟢 toast
  const [message, setMessage] = useState("");

  // 📦 categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // 🔍 filter logic (UNCHANGED)
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      (!minPrice || p.price >= Number(minPrice)) &&
      (!maxPrice || p.price <= Number(maxPrice))
    );
  });

  // 🛒 add to cart (FIXED)
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();

    if (product.stock === 0) return; // 🚫 prevent

    addToCart(product);

    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">

      {/* ✨ TOAST */}
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white text-black px-5 py-3 rounded-full shadow-lg flex items-center gap-3 border border-gray-200">
            <span>✔</span>
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold">Products</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border"
      />

      {/* 🎯 FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center">

        {/* CATEGORY */}
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 pr-10 rounded-lg bg-black text-white border border-gray-600 appearance-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ▼
          </span>
        </div>

        {/* PRICE */}
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-28"
        />

        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-28"
        />

        {/* RESET */}
        <button
          onClick={() => {
            setSearch("");
            setCategory("all");
            setMinPrice("");
            setMaxPrice("");
          }}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Reset
        </button>
      </div>

      {/* 🧱 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>

            <div className="bg-white text-black rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 group cursor-pointer">

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/300";
                  }}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* INFO */}
              <div className="p-4 space-y-3">

                <p className="font-semibold text-lg">{product.name}</p>

                <p className="text-gray-500">
                  ${product.price.toFixed(2)}
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
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    product.stock > 0
                      ? "bg-black text-white hover:bg-gray-800 active:scale-95"
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

      {/* EMPTY */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}