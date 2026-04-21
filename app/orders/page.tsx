"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

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

  // 📦 load user-specific orders
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

  // 🗑 delete order (per user)
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

  const getStatusStyle = (status: string) => {
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";
    if (status === "Shipped")
      return "bg-blue-100 text-blue-700";
    if (status === "Delivered")
      return "bg-green-100 text-green-700";
  };

  // ⛔ prevent flash
 if (loading) return null; // wait for auth
if (!user) return null;  // then protect

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Your Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet</p>
      )}

      {orders.map((order) => {
        const total = (order.items || []).reduce(
          (sum: number, item: any) =>
            sum + item.price * item.quantity,
          0
        );

        return (
          <div
            key={order.id}
            className="bg-white text-black rounded-xl p-6 shadow space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>

                <p className="font-bold">${total}</p>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            <hr />

            {order.items?.map((item: any) => (
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
            ))}
          </div>
        );
      })}
    </div>
  );
}