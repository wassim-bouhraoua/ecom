"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // total quantity (important)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <Link href="/" className="text-xl font-bold">
        🛍️ My Store
      </Link>

      {/* CART */}
      <Link href="/cart" className="relative">
        🛒

        {/* BADGE */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
}