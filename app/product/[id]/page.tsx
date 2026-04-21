"use client";

import { use, useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/app/data/products";
import { useRouter } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<Product | null>(null);

  // unwrap params
  const { id } = use(params);

  // 🔥 LOAD FROM LOCALSTORAGE (IMPORTANT)
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    const found = stored.find((p: Product) => p.id === id);

    setProduct(found || null);
  }, [id]);

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  const handleAddToCart = () => {
    if (message) return;
    if (product.stock === 0) return; // 🚫 prevent

    addToCart(product);

    setMessage(`✅ ${product.name} added to cart`);
    setTimeout(() => setMessage(""), 2000);
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

          {/* ✅ STOCK STATUS */}
          <p
            className={`text-sm font-medium ${
              product.stock > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `✔ In stock (${product.stock})`
              : "Out of stock"}
          </p>

          <div className="flex gap-4 mt-4">

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`py-2 px-4 rounded-lg ${
                product.stock > 0
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* BUY NOW */}
            <button
              onClick={() =>
                product.stock > 0 &&
                router.push(`/checkout?product=${product.id}`)
              }
              disabled={product.stock === 0}
              className={`py-2 px-4 rounded-lg border ${
                product.stock > 0
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}