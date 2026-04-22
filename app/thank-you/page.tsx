"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// shadcn
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
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">

      <Card className="w-full max-w-2xl shadow-xl border">
        <CardContent className="p-8 space-y-8 text-center">

          {/* 🎉 SUCCESS ICON */}
          <div className="flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <span className="text-3xl">✅</span>
            </div>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">
              Order Confirmed
            </h1>
            <p className="text-muted-foreground">
              Your order has been placed successfully 🎉
            </p>
          </div>

          {/* ORDER INFO */}
          {order && (
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                Order ID:{" "}
                <span className="font-semibold text-foreground">
                  #{order.id}
                </span>
              </p>
              <p>{order.date}</p>
            </div>
          )}

          <Separator />

          {/* ITEMS */}
          <div className="space-y-3 text-left">

            {order?.items?.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No items
              </p>
            ) : (
              order?.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="font-medium">
                    {item.name} × {item.quantity}
                  </span>

                  <span className="text-muted-foreground">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))
            )}

          </div>

          <Separator />

          {/* TOTAL */}
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">

            <Button asChild size="lg" className="w-full">
              <Link href="/product">
                Continue Shopping
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full"
            >
              <Link href="/">
                Go Home
              </Link>
            </Button>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}