"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotal,
  } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>
        <Link href="/" className="text-blue-500 underline">
          ← Continue Shopping
        </Link>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <p className="text-gray-500 text-lg">Your cart is empty 😢</p>
      )}

      {/* CART ITEMS */}
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* QUANTITY CONTROLS */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
  
  <button
    onClick={(e) => {
      e.stopPropagation();
      decreaseQuantity(item.id);
    }}
    className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 transition"
  >
    −
  </button>

  <span className="px-4 font-semibold text-gray-900">
    {item.quantity}
  </span>

  <button
    onClick={(e) => {
      e.stopPropagation();
      addToCart(item);
    }}
    className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-200 transition"
  >
    +
  </button>

</div>

              {/* REMOVE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item.id);
                }}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="mt-10 text-right">
          <p className="text-2xl font-bold">Total: ${getTotal()}</p>
          <button className="mt-4 bg-black text-white px-6 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}