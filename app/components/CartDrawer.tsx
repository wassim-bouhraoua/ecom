"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

// shadcn
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ShoppingCart } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotal,
  } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Sheet>
      {/* 🛒 Trigger (cart icon) */}
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingCart className="w-6 h-6" />

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      {/* 📦 Drawer Content */}
      <SheetContent className="flex flex-col justify-between">

        <div>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">

            {cart.length === 0 && (
              <p className="text-muted-foreground">
                Your cart is empty 😢
              </p>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    className="w-14 h-14 object-contain rounded"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </Button>

                  <span className="text-sm">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </Button>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* 💰 Footer */}
        <div className="space-y-4">
          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${getTotal()}</span>
          </div>

          <Button asChild className="w-full">
            <Link href="/checkout">
              Checkout
            </Link>
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}