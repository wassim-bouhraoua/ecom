"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [order, setOrder] = useState<any>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");

    if (saved) {
      const parsed = JSON.parse(saved);

      setOrder(parsed);

      // ✅ FIX: use parsed.items (NOT parsed)
      const totalPrice = parsed.items.reduce(
        (sum: number, item: any) =>
          sum + item.price * item.quantity,
        0
      );

      setTotal(totalPrice);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-2xl space-y-8 text-center">

        {/* 🎉 ICON */}
        <div className="text-6xl">🎉</div>

        {/* TITLE */}
        <div>
          <h1 className="text-3xl font-bold">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-400 mt-2">
            Thank you for your purchase
          </p>
        </div>

        {/* 🧾 ORDER INFO */}
        {order && (
          <div className="text-sm text-gray-400 space-y-1">
            <p>
              Order ID:{" "}
              <span className="text-white font-semibold">
                {order.id}
              </span>
            </p>
            <p>Date: {order.date}</p>
          </div>
        )}

        {/* 📦 ORDER SUMMARY */}
        <div className="bg-white text-black rounded-xl p-6 shadow space-y-4 text-left">

          <h2 className="text-xl font-semibold">Order Summary</h2>

          {/* ITEMS */}
          {order?.items?.length === 0 ? (
            <p className="text-gray-500">No items</p>
          ) : (
            order?.items?.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
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

        {/* BUTTONS */}
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
    </div>
  );
}