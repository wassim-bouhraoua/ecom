"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function Page() {
  const { addToCart } = useCart();

  //  filters state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //  toast message
  const [message, setMessage] = useState("");

  //  dynamic categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  //  filter function 
  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      (!minPrice || p.price >= Number(minPrice)) &&
      (!maxPrice || p.price <= Number(maxPrice))
    );
  });

  // clean add to cart
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // prevent Link navigation

    if (message) return;

    addToCart(product);

    setMessage(`✅ ${product.name} added to cart`);

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">

      {/*  TOAST */}
   {message && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <div className="bg-white text-black px-5 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in border border-gray-200">

      {/* ICON */}
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
        <span className="text-green-600 text-sm">✔</span>
      </div>

      {/* TEXT */}
      <span className="text-sm font-medium">
        {message}
      </span>

    </div>
  </div>
)}
      <h1 className="text-3xl font-bold">Products</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border"
      />

      {/* FILTER BAR */}
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

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:scale-95 transition"
        >
          Reset
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>

            <div className="bg-white text-black rounded-xl overflow-hidden shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer">

              <img
                src={product.image}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 space-y-2">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-500">
                  ${product.price.toFixed(2)}
                </p>

                {/* ADD TO CART */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 active:scale-95 transition cursor-pointer"
                >
                  Add to Cart
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