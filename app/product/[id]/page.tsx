"use client";

import { use } from "react";
import { useCart } from "@/app/context/CartContext";

const products = [
  {
    id: "phone",
    name: "Phone",
    price: 300,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    id: "laptop",
    name: "Laptop",
    price: 1000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: "headphones",
    name: "Headphones",
    price: 100,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  }
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart } = useCart();

  // ✅ unwrap params (Next.js 15 fix)
  const { id } = use(params);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div className="bg-white rounded-xl p-6 shadow">
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
            This is a high-quality {product.name}.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            
            <button
  onClick={() => addToCart(product)}
  className="bg-black text-white px-6 py-3 rounded-lg"
>
  Add to Cart
</button>

            <button className="border px-6 py-3 rounded-lg">
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}