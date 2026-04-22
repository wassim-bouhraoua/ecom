"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

// shadcn
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);

  // 🔐 protect page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 📦 load orders
  useEffect(() => {
    if (!user) return;

    const saved = localStorage.getItem(`orders_${user.name}`);

    if (saved) {
      const parsed = JSON.parse(saved);

      const withStatus = parsed.map((order: any) => ({
        ...order,
        status: order.status || "Pending",
      }));

      setOrders(withStatus);
    } else {
      setOrders([]);
    }
  }, [user]);

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);

    if (user) {
      localStorage.setItem(
        `orders_${user.name}`,
        JSON.stringify(updated)
      );
    }
  };

  const getStatusVariant = (status: string) => {
    if (status === "Pending") return "secondary";
    if (status === "Shipped") return "default";
    if (status === "Delivered") return "outline";
    return "secondary";
  };

  if (loading || !user) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      <h1 className="text-3xl font-bold">Your Orders</h1>

      {orders.length === 0 && (
        <p className="text-muted-foreground">
          No orders yet 😢
        </p>
      )}

      {orders.map((order) => {
        const total = (order.items || []).reduce(
          (sum: number, item: any) =>
            sum + item.price * item.quantity,
          0
        );

        return (
          <Card key={order.id} className="shadow-sm">
            <CardContent className="p-6 space-y-4">

              {/* HEADER */}
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.date}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>

                  <p className="font-semibold">
                    ${total}
                  </p>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </Button>

                </div>
              </div>

              <Separator />

              {/* ITEMS */}
              <div className="space-y-2">
                {order.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span className="text-muted-foreground">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}