"use client";

import { use } from "react";
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart } = useCart();

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