"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import ProductCard from "@/app/components/ProductCard";

// shadcn
import { Button } from "@/components/ui/button";

export default function Home() {
  const { addToCart } = useCart();
  const [list, setList] = useState<Product[]>([]);

  // ✅ FETCH FROM API INSTEAD OF products.ts
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const featuredProducts = list.slice(0, 3);

 const handleAddToCart = (product: any, e?: React.MouseEvent) => {
  e?.preventDefault();

    if (product.stock === 0) return;

    addToCart({
      ...product,
      image: product.images?.[0] || "/placeholder.png",
    });
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
          </p>

          <div className="flex gap-4 pt-2">
            <Button asChild size="lg">
              <Link href="/product">Shop Now →</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
          className="rounded-2xl shadow-xl"
        />
      </div>

      {/* FEATURED */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Products</h2>

          <Link href="/product" className="text-sm hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

    </div>
  );
}