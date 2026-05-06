"use client";

import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";

// ✅ shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ✅ toast
import { toast } from "sonner";

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

  const total = singleProduct ? singleProduct.price : getTotal();

  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    if (loading) return;

    const { name, address, card } = form;

    if (!name || !address || !card) {
      toast.error("Please fill all fields ⚠️");
      return;
    }

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: itemsToShow,
          user: user.name,
        }),
      });

      const data = await response.json();

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(data)
      );

      clearCart();

      toast.success("Order placed successfully 🎉");

      router.push("/thank-you");

    } catch (error) {
      console.error(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">

      <h1 className="text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <Card>
          <CardContent className="p-6 space-y-6">

            <h2 className="text-xl font-semibold">
              Shipping Details
            </h2>

            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <Input
              name="card"
              placeholder="Card Number"
              value={form.card}
              onChange={handleChange}
            />

            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Processing..."
                : "Place Order"}
            </Button>

          </CardContent>
        </Card>

        {/* SUMMARY */}
        <Card>
          <CardContent className="p-6 space-y-4">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>

            {itemsToShow.length === 0 && (
              <p className="text-muted-foreground">
                No items
              </p>
            )}

            {itemsToShow.map((item) => (
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

            <Separator />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

          </CardContent>
        </Card>

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