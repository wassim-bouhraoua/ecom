"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { Suspense } from "react";

function CheckoutContent() {
  const { cart, getTotal, clearCart } = useCart();
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

    setError("");
    setLoading(true);

    const newOrder = {
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      date: new Date().toLocaleDateString(),
      items: itemsToShow, 
      status: "Pending", 
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    localStorage.setItem("lastOrder", JSON.stringify(newOrder));

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