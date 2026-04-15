"use client";

import { use, useState } from "react"; // ✅ IMPORTANT
import { useCart } from "@/app/context/CartContext";
import { products } from "@/app/data/products";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ it's a Promise in your setup
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [message, setMessage] = useState("");

  // ✅ FIX: unwrap params
  const { id } = use(params);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  const handleAddToCart = () => {
    if (message) return;

    addToCart(product);

    setMessage(`✅ ${product.name} added to cart`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      {message && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

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
            {product.description}
          </p>

          <div className="flex gap-4 mt-4">

            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-4 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={() =>
                router.push(`/checkout?product=${product.id}`)
              }
              className="border border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}