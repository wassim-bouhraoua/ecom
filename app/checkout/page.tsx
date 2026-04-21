"use client";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { Suspense } from "react";

function CheckoutContent() {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const singleProduct = products.find((p) => p.id === productId);

  const itemsToShow = singleProduct
    ? [{ ...singleProduct, quantity: 1 }]
    : cart;

  const total = singleProduct
    ? singleProduct.price
    : getTotal();

  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 HANDLE PENDING ORDER AFTER LOGIN
  useEffect(() => {
    if (!user) return;

    const pending = localStorage.getItem("pendingOrder");

    if (pending) {
      const parsed = JSON.parse(pending);

      const newOrder = {
        id: Math.random().toString(36).substring(2, 8).toUpperCase(),
        date: new Date().toLocaleDateString(),
        items: parsed.items,
        status: "Pending",
      };

      const existingOrders = JSON.parse(
        localStorage.getItem(`orders_${user.name}`) || "[]"
      );

      localStorage.setItem(
        `orders_${user.name}`,
        JSON.stringify([newOrder, ...existingOrders])
      );

      localStorage.setItem("lastOrder", JSON.stringify(newOrder));

      // ✅ UPDATE STOCK (FIXED)
      const storedProducts =
        JSON.parse(localStorage.getItem("products") || "null") ||
        products;

      const updatedProducts = storedProducts.map((p: any) => {
        const found = parsed.items.find((i: any) => i.id === p.id);

        if (found) {
          return {
            ...p,
            stock: Math.max(p.stock - found.quantity, 0),
          };
        }

        return p;
      });

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      localStorage.removeItem("pendingOrder");
      clearCart();

      router.push("/thank-you");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    if (loading) return;

    const { name, address, card } = form;

    if (!name || !address || !card) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // 🔐 REQUIRE LOGIN
    if (!user) {
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          items: itemsToShow,
          total,
        })
      );

      router.push("/login");
      return;
    }

    setError("");
    setLoading(true);

    const newOrder = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: itemsToShow,
      status: "Pending",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem(`orders_${user.name}`) || "[]"
    );

    localStorage.setItem(
      `orders_${user.name}`,
      JSON.stringify([newOrder, ...existingOrders])
    );

    localStorage.setItem("lastOrder", JSON.stringify(newOrder));

    // ✅ UPDATE STOCK (NORMAL FLOW)
    const storedProducts =
      JSON.parse(localStorage.getItem("products") || "null") ||
      products;

    const updatedProducts = storedProducts.map((p: any) => {
      const found = itemsToShow.find((i) => i.id === p.id);

      if (found) {
        return {
          ...p,
          stock: Math.max(p.stock - found.quantity, 0),
        };
      }

      return p;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    clearCart();

    setTimeout(() => {
      router.push("/thank-you");
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Shipping Details</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent"
          />

          <input
            name="card"
            placeholder="Card Number"
            value={form.card}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent"
          />

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-white text-black rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {itemsToShow.length === 0 && (
            <p className="text-gray-500">No items</p>
          )}

          {itemsToShow.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                {item.name} × {item.quantity}
              </div>
              <div>${item.price * item.quantity}</div>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading...</p>}>
      <CheckoutContent />
    </Suspense>
  );
}