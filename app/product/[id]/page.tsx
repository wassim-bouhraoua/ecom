"use client";

import { use, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart } = useCart();

  // toast message
  const [message, setMessage] = useState("");

  // get product id from URL
  const { id } = use(params);

  // find product
  const product = products.find((p) => p.id === id);

  //  fallback if not found
  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  // clean add to cart function
  const handleAddToCart = () => {
    if (message) return; // prevent spam

    addToCart(product);

    setMessage(`✅ ${product.name} added to cart`);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* TOAST */}
      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-contain"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl text-green-600 font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-500">
            {product.description}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 active:scale-95 transition cursor-pointer"
            >
              Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              className="border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black active:scale-95 transition cursor-pointer"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}