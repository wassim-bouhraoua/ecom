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

  // ➕ increase quantity
  const handleIncrease = (item: any) => {
    addToCart(item);
  };

  // ➖ decrease quantity
  const handleDecrease = (id: string) => {
    decreaseQuantity(id);
  };

  // ❌ remove item
  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>

        <Link
  href="/product"
  className="flex items-center gap-2 text-gray-400 hover:text-white transition hover:translate-x-1"
>
  ← Continue Shopping
</Link>
      </div>

      {/* EMPTY */}
      {cart.length === 0 && (
        <p className="text-gray-500 text-lg">Your cart is empty 😢</p>
      )}

      {/* ITEMS */}
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
                className="w-20 h-20 object-contain"
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* QUANTITY */}
              <div className="flex items-center border rounded-lg overflow-hidden">

                <button
                  onClick={() => handleDecrease(item.id)}
                  className="px-4 py-2 bg-black text-white"
                >
                  −
                </button>

                <span className="px-4 font-semibold text-black">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleIncrease(item)}
                  className="px-4 py-2 bg-black text-white"
                >
                  +
                </button>

              </div>

              {/* REMOVE */}
              <button
  onClick={() => handleRemove(item.id)}
  className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white active:scale-95 transition"
>
  Remove
</button>

            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      {cart.length > 0 && (
        <div className="mt-10 text-right space-y-4">

          <p className="text-2xl font-bold">
            Total: ${getTotal()}
          </p>

          <Link
            href="/checkout"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Checkout
          </Link>

        </div>
      )}
    </div>
  );
}