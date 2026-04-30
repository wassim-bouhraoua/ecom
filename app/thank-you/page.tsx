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

      <Card className="w-full max-w-xl shadow-2xl border border-white/10 backdrop-blur-lg">
        <CardContent className="p-10 space-y-8 text-center">

          {/* ✅ SUCCESS ICON */}
          <div className="flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/20 border border-green-500/30 shadow-lg">
              <span className="text-4xl">✔</span>
            </div>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Order Confirmed
            </h1>
            <p className="text-muted-foreground text-sm">
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
          <div className="space-y-4 text-left">

            {order?.items?.length === 0 ? (
              <p className="text-muted-foreground text-center">
                No items
              </p>
            ) : (
              order?.items?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm bg-white/5 px-4 py-3 rounded-lg border border-white/10"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    {/* ✅ show options */}
                    {item.selectedOptions && (
                      <p className="text-xs text-muted-foreground">
                        {Object.entries(item.selectedOptions)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" • ")}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-medium">
                    ${item.price * item.quantity}
                  </span>
                </div>
              ))
            )}

          </div>

          <Separator />

          {/* TOTAL */}
          <div className="flex justify-between items-center text-xl font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 pt-4">

            <Button
              asChild
              size="lg"
              className="w-full text-base font-semibold"
            >
              <Link href="/product">
                Continue Shopping →
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full text-base"
            >
              <Link href="/">
                Back to Home
              </Link>
            </Button>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}