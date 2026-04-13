"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

export default function Page() {
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = [
    {
      id: "phone",
      name: "Phone",
      category: "phone",
      price: 300,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      id: "laptop",
      name: "Laptop",
      category: "laptop",
      price: 1000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      id: "headphones",
      name: "Headphones",
      category: "audio",
      price: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    }
  ];

  // 🔥 REAL FILTER LOGIC
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

      {/* TITLE */}
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
        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="px-4 py-2 rounded-lg bg-white text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
>
  <option value="all">All Categories</option>
  <option value="phone">Phones</option>
  <option value="laptop">Laptops</option>
  <option value="audio">Audio</option>
</select>

        {/* MIN PRICE */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-32"
        />

        {/* MAX PRICE */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg w-32"
        />

        {/* RESET BUTTON */}
        <button
          onClick={() => {
            setCategory("all");
            setMinPrice("");
            setMaxPrice("");
            setSearch("");
          }}
          className="px-4 py-2 bg-black text-white rounded-lg"
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
                alt={product.name}
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
                    addToCart(product);
                  }}
                  className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>

            </div>

          </Link>
        ))}
      </div>

      {/* NO RESULTS */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

    </div>
  );
}