"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="w-full border-b border-gray-800 bg-black sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          🛍️ MyStore
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-6">

          <Link href="/" className="hover:text-gray-300 transition">
            Home
          </Link>

          <Link href="/product" className="hover:text-gray-300 transition">
            Products
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative hover:text-gray-300 transition">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 👤 USER ICON */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="text-xl hover:scale-110 transition"
            >
              👤
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">

                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    alert("Logged out (fake)");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}