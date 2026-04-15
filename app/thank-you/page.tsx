"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {

  // 🧾 store last order
  const [order, setOrder] = useState<any[]>([]);

  // 📦 load order from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");

    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  // 💰 calculate total
  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-8 text-center space-y-8">

      {/* ✅ SUCCESS ICON */}
      <div className="text-6xl">✅</div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold">
        Order Placed Successfully!
      </h1>

      <p className="text-gray-400">
        Thank you for your purchase 🎉
      </p>

      {/* 📦 ORDER SUMMARY */}
      <div className="bg-white text-black rounded-xl p-6 shadow text-left space-y-4">

        <h2 className="text-xl font-semibold">Order Summary</h2>

        {/* EMPTY STATE */}
        {order.length === 0 ? (
          <p className="text-gray-500">No items</p>
        ) : (
          order.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ${item.price * item.quantity}
              </span>
            </div>
          ))
        )}

        <hr />

        {/* TOTAL */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-center gap-4">

        <Link
          href="/product"
          className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Continue Shopping
        </Link>

        <Link
          href="/"
          className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}