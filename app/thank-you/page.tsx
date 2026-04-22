"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ✅ shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ThankYouPage() {
  const [order, setOrder] = useState<any>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");

    if (saved) {
      const parsed = JSON.parse(saved);

      setOrder(parsed);

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
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase
          </p>
        </div>

        {/* 🧾 ORDER INFO */}
        {order && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Order ID:{" "}
              <span className="font-semibold text-foreground">
                {order.id}
              </span>
            </p>
            <p>Date: {order.date}</p>
          </div>
        )}

        {/* 📦 ORDER SUMMARY */}
        <Card>
          <CardContent className="p-6 space-y-4 text-left">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            {/* ITEMS */}
            {order?.items?.length === 0 ? (
              <p className="text-muted-foreground">No items</p>
            ) : (
              order?.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
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

            <Separator />

            {/* TOTAL */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

          </CardContent>
        </Card>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">

          <Button asChild size="lg">
            <Link href="/product">
              Continue Shopping
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/">
              Go Home
            </Link>
          </Button>

        </div>

      </div>
    </div>
  );
}