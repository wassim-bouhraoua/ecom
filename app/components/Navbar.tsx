"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

import { ThemeToggle } from "@/app/components/common/ThemeToggle";
import CartDrawer from "@/app/components/CartDrawer";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

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

          {/* 🛒 CART DRAWER (FIXED) */}
          <CartDrawer />

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