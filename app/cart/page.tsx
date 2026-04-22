"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

// ✅ shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    getTotal,
  } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🛒 Your Cart</h1>

        <Button asChild variant="ghost">
          <Link href="/product">
            ← Continue Shopping
          </Link>
        </Button>
      </div>

      {/* EMPTY */}
      {cart.length === 0 && (
        <p className="text-muted-foreground text-lg">
          Your cart is empty 😢
        </p>
      )}

      {/* ITEMS */}
      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex items-center justify-between gap-4">

              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="w-20 h-20 object-contain rounded-md"
                />

                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-muted-foreground">
                    ${item.price}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">

                {/* QUANTITY */}
                <div className="flex items-center border rounded-md overflow-hidden">

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </Button>

                  <span className="px-3 font-semibold">
                    {item.quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </Button>

                </div>

                {/* REMOVE */}
                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>

              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* TOTAL */}
      {cart.length > 0 && (
        <>
          <Separator />

          <div className="flex justify-between items-center">

            <p className="text-2xl font-bold">
              Total: ${getTotal()}
            </p>

            <Button asChild size="lg">
              <Link href="/checkout">
                Checkout
              </Link>
            </Button>

          </div>
        </>
      )}
    </div>
  );
}