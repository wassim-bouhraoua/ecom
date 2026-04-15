"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { Suspense } from "react";
function CheckoutContent() {
  const { cart, getTotal, clearCart } = useCart();
  const router = useRouter();

  // 🔍 get product from URL (Buy Now)
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  // 🔍 find product if Buy Now
  const singleProduct = products.find((p) => p.id === productId);

  // 🎯 decide what to show
  const itemsToShow = singleProduct
    ? [{ ...singleProduct, quantity: 1 }]
    : cart;

  // 💰 total
  const total = singleProduct
    ? singleProduct.price
    : getTotal();

  // 📝 form state
  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // ✨ prevent spam click

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🧾 checkout logic
  const handleCheckout = () => {
    if (loading) return;

    const { name, address, card } = form;

    // ❌ validation
    if (!name || !address || !card) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // ✅ success
    setError("");
    setSuccess(true);
    setLoading(true);

    setTimeout(() => {
      // 💾 save correct order (cart OR buy now)
    const orderData = {
  id: Math.random().toString(36).substring(2, 8).toUpperCase(), // random ID
  date: new Date().toLocaleDateString(), // today's date
  items: itemsToShow,
};

localStorage.setItem("lastOrder", JSON.stringify(orderData));

      clearCart();

      router.push("/thank-you"); // ✅ better navigation
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      {/* SUCCESS */}
      {success && (
        <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-lg">
          ✅ Order placed successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: FORM */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Shipping Details</h2>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          <input
            name="card"
            type="text"
            placeholder="Card Number"
            value={form.card}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button
            onClick={handleCheckout}
            disabled={loading || !form.name || !form.address || !form.card}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white text-black rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          {/* EMPTY */}
          {itemsToShow.length === 0 && (
            <p className="text-gray-500">No items</p>
          )}

          {/* ITEMS */}
          {itemsToShow.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                {item.name} × {item.quantity}
              </div>
              <div>
                ${item.price * item.quantity}
              </div>
            </div>
          ))}

          <hr />

          {/* TOTAL */}
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