"use client";

import Link from "next/link";
import { useState } from "react";
import { Product } from "@/app/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProductCard({
  product,
  handleAddToCart,
}: {
  product: Product;
  handleAddToCart: (product: any, e: React.MouseEvent) => void;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const hasOptions = product.options && product.options.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock === 0) return;

    if (hasOptions) {
      setSelectedOptions({});
      setOpen(true);
    } else {
      handleAddToCart(product, e);
    }
  };

  const handleSelect = (name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  
  for (const opt of product.options || []) {
    if (!selectedOptions[opt.name]) {
      alert(`Select ${opt.name}`);
      return;
    }
  }

  handleAddToCart(
    {
      ...product,
      selectedOptions,
    },
    e
  );

  setOpen(false);
};
  return (
    <>
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
          <CardContent className="p-0">

            {/* IMAGE */}
            <div className="relative">
              <img
                src={product.images?.[index] || "/placeholder.png"}
                className="w-full h-48 object-cover"
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
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
                    prev === product.images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 rounded"
              >
                ▶
              </button>
            </div>

            {/* INFO */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <p className="font-semibold">{product.name}</p>
                <Badge>{product.category}</Badge>
              </div>

              <p>${product.price.toFixed(2)}</p>

              <p
                className={`text-xs ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `✔ In stock (${product.stock})`
                  : "Out of stock"}
              </p>

              <Button
                onClick={handleClick}
                disabled={product.stock === 0}
                className="w-full"
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>

          </CardContent>
        </Card>
      </Link>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Options</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {product.options?.map((opt) => (
              <div key={opt.name}>
                <p className="text-sm text-gray-400 mb-2">{opt.name}</p>

                <div className="flex gap-3 flex-wrap">
                  {opt.values.map((value) => {
                    const isSelected = selectedOptions[opt.name] === value;
                    const isColor = opt.name.toLowerCase() === "color";

                    return isColor ? (
                      <button
                        key={value}
                        onClick={() => handleSelect(opt.name, value)}
                        className={`w-9 h-9 rounded-full border-2 ${
                          isSelected
                            ? "ring-2 ring-white scale-110 border-white"
                            : "border-gray-600"
                        }`}
                        style={{ backgroundColor: value }}
                      />
                    ) : (
                      <button
                        key={value}
                        onClick={() => handleSelect(opt.name, value)}
                        className={`px-4 py-1.5 rounded-md border text-sm ${
                          isSelected
                            ? "bg-white text-black border-white ring-2 ring-white"
                            : "text-gray-300 border-gray-600"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleConfirm} className="w-full mt-4">
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}