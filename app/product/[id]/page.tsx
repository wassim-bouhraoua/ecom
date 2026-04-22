"use client";

import { use, useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, type Product } from "@/app/data/products";
import { useRouter } from "next/navigation";

// ✅ shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ✅ toast
import { toast } from "sonner";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  const { id } = use(params);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    const found = stored.find((p: Product) => p.id === id);
    setProduct(found || null);
  }, [id]);

  if (!product) {
    return (
      <p className="p-6 text-muted-foreground">
        Product not found
      </p>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("Out of stock ❌");
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <Card>
          <CardContent className="p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-contain"
            />
          </CardContent>
        </Card>

        {/* INFO */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold">
            ${product.price}
          </p>

          <p className="text-muted-foreground">
            {product.description}
          </p>

          {/* STOCK */}
          <p
            className={`text-sm font-medium ${
              product.stock > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `✔ In stock (${product.stock})`
              : "Out of stock"}
          </p>

          <div className="flex gap-4 mt-4">

            {/* ADD TO CART */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>

            {/* BUY NOW */}
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