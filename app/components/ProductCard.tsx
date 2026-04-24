"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/app/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({
  product,
  handleAddToCart,
}: {
  product: Product;
  handleAddToCart: (product: Product, e: React.MouseEvent) => void;
}) {
  const [index, setIndex] = useState(0);

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
        <CardContent className="p-0">

          {/* IMAGE SLIDER */}
          <div className="relative overflow-hidden">
            <img
              src={product.images?.[index] || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex((prev) =>
                  prev === 0
                    ? product.images.length - 1
                    : prev - 1
                );
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 rounded"
            >
              ◀
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex((prev) =>
                  prev === product.images.length - 1
                    ? 0
                    : prev + 1
                );
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 rounded"
            >
              ▶
            </button>
          </div>

          {/* INFO */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">
                {product.name}
              </p>
              <Badge variant="secondary">
                {product.category}
              </Badge>
            </div>

            <p className="text-muted-foreground">
              ${product.price.toFixed(2)}
            </p>

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
  );
}