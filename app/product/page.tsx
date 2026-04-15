"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function Page() {
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["all", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    const matchesMin =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMax =
      maxPrice === "" || product.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">

      {/* ✅ TOAST MESSAGE */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
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

      {/* FILTER */}
      <div className="flex flex-wrap gap-4 items-center">

        <div className="relative inline-block">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 pr-10 rounded-lg bg-black text-white border border-gray-600 appearance-none cursor-pointer"
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

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-32"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-32"
        />

        <button
          onClick={() => {
            setCategory("all");
            setMinPrice("");
            setMaxPrice("");
            setSearch("");
          }}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 active:scale-95 transition cursor-pointer"
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

              <div className="p-4">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-500">
                  ${product.price.toFixed(2)}
                </p>

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

      {filteredProducts.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

    </div>
  );
}