"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/app/data/products";
import { useRouter, useParams } from "next/navigation";

// shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// toast
import { toast } from "sonner";

export default function ProductPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  // ✅ FIX: get params correctly
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [index, setIndex] = useState(0); // slider index

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    const found = stored.find((p: Product) => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("Out of stock ❌");
      return;
    }

    addToCart({
      ...product,
      image: product.images?.[0],
    });

    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE SLIDER */}
        <Card>
          <CardContent className="p-6 relative">

            <img
              src={product.images?.[index] || "/placeholder.png"}
              alt={product.name}
              className="w-full h-80 object-contain"
            />

            {/* LEFT */}
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
            >
              ◀
            </button>

            {/* RIGHT */}
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
            >
              ▶
            </button>

          </CardContent>
        </Card>

        {/* INFO */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold">
            ${product.price}
          </p>

          <p className="text-muted-foreground">
            {product.description}
          </p>

          {/* STOCK */}
          <p
            className={`text-sm ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `✔ In stock (${product.stock})`
              : "Out of stock"}
          </p>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-4">

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                product.stock > 0 &&
                router.push(`/checkout?product=${product.id}`)
              }
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
}