"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, getTotal, clearCart } = useCart();

  // state object for all inputs
  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
  });

  //  error 
  const [error, setError] = useState("");

  //  success 
  const [success, setSuccess] = useState(false);

  // handler for all inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form, // keep previous values
      [e.target.name]: e.target.value, // update only changed field
    });
  };

  //  checkout logic
  const handleCheckout = () => {
    const { name, address, card } = form;

    // validation
    if (!name || !address || !card) {
      setError("⚠️ Please fill all fields");
      return;
    }

    // success
    setError("");
    setSuccess(true);

    // clear cart after order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-10">Checkout</h1>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-lg">
          ✅ Order placed successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: FORM */}
        <div className="space-y-6">

          <h2 className="text-xl font-semibold">Shipping Details</h2>

          {/*  ERROR MESSAGE */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* INPUT: NAME */}
          <input
            name="name" 
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* INPUT: ADDRESS */}
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* INPUT: CARD */}
          <input
            name="card"
            type="text"
            placeholder="Card Number"
            value={form.card}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          />

          {/* BUTTON */}
          <button
            onClick={handleCheckout}
            disabled={!form.name || !form.address || !form.card}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition disabled:opacity-50"
          >
            Place Order
          </button>

        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white text-black rounded-xl p-6 shadow space-y-4">

          <h2 className="text-xl font-semibold">Order Summary</h2>

          {/* EMPTY STATE */}
          {cart.length === 0 && (
            <p className="text-gray-500">No items in cart</p>
          )}

          {/* ITEMS */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm"
            >
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
            <span>${getTotal()}</span>
          </div>

        </div>

      </div>
    </div>
  );
}