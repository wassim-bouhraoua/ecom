"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/app/data/products";

// ✅ shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ✅ toast
import { toast } from "sonner";

export default function Home() {
  const { addToCart } = useCart();

  const [list, setList] = useState<Product[]>([]);

  // 🔥 load products
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    setList(stored);
  }, []);

  // 🎯 featured
  const featuredProducts = list.slice(0, 3);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();

    if (product.stock === 0) {
      toast.error("Out of stock ❌");
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-24">

      {/* HERO */}
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Shop Smart.
            <br />
            Shop Fast.
          </h1>

          <p className="text-muted-foreground text-lg max-w-md">
            Discover high-quality tech products at unbeatable prices.
            Fast delivery, secure checkout, and great experience.
          </p>

          <div className="flex gap-4 pt-2">

            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/product">
                Shop Now →
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-6"
            >
              <Link href="/cart">
                View Cart
              </Link>
            </Button>

          </div>

          <div className="flex gap-6 text-sm text-muted-foreground pt-6">
            <p>🚚 Free Shipping</p>
            <p>🔒 Secure Payment</p>
            <p>⚡ Fast Delivery</p>
          </div>
        </div>

        <div className="relative group">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
            className="rounded-2xl shadow-xl group-hover:scale-105 transition duration-300"
          />
          <div className="absolute inset-0 bg-black/30 rounded-2xl" />
        </div>
      </div>

      {/* FEATURED */}
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Featured Products
          </h2>

          <Link
            href="/product"
            className="text-sm text-muted-foreground hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>

              <Card className="overflow-hidden hover:shadow-xl hover:scale-[1.03] transition cursor-pointer group">
                <CardContent className="p-0">

                  <img
                    src={product.image}
                    className="h-52 w-full object-cover group-hover:scale-105 transition"
                  />

                  <div className="p-5 space-y-3">

                    <p className="font-semibold text-lg">
                      {product.name}
                    </p>

                    <p className="text-muted-foreground">
                      ${product.price}
                    </p>

                    {/* STOCK */}
                    <p
                      className={`text-xs font-medium ${
                        product.stock > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {product.stock > 0
                        ? `✔ In stock (${product.stock})`
                        : "Out of stock"}
                    </p>

                    {/* BUTTON */}
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={product.stock === 0}
                      className="w-full"
                    >
                      {product.stock > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </Button>

                  </div>

                </CardContent>
              </Card>

            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}