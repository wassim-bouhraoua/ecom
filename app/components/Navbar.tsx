"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "@/app/components/common/ThemeToggle";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    if (cart.length === 0) return;

    setAnimate(true);

    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [cart]);

  return (
    <div className="w-full border-b bg-background text-foreground sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          🛍️ MyStore
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-6">

          <Link href="/" className="hover:opacity-70 transition">
            Home
          </Link>

          <Link href="/product" className="hover:opacity-70 transition">
            Products
          </Link>

          {/* 🌗 THEME TOGGLE */}
          <ThemeToggle />

          {/* 🛒 CART */}
          <Link
            href="/cart"
            className="relative flex items-center hover:opacity-70 transition"
          >
            <ShoppingCart
              className={`w-6 h-6 transition-transform duration-300 ${
                animate ? "scale-125 rotate-12" : ""
              }`}
            />

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 👤 USER */}
          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setOpen(!open)}
                  className="text-sm hover:opacity-70 transition"
                >
                  👋 {user.name}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-40 bg-popover text-popover-foreground border rounded-lg shadow-lg overflow-hidden">

                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-muted"
                      onClick={() => setOpen(false)}
                    >
                      Orders
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-muted"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="text-xl hover:scale-110 transition"
              >
                👤
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}