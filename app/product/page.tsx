"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, Product } from "@/app/data/products";

// ✅ shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ✅ toast
import { toast } from "sonner";

export default function Page() {
  const { addToCart } = useCart();

  const [list, setList] = useState<Product[]>([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("products") || "null") || products;

    setList(stored);
  }, []);

  // 🔍 filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["all", ...new Set(list.map((p) => p.category))];

  const filteredProducts = list.filter((p: Product) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category) &&
      (!minPrice || p.price >= Number(minPrice)) &&
      (!maxPrice || p.price <= Number(maxPrice))
    );
  });

  // 🛒 add to cart
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
    <div className="max-w-6xl mx-auto p-8 space-y-6">

      <h1 className="text-3xl font-bold">Products</h1>

      {/* 🔍 SEARCH */}
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 FILTER BAR */}
      <div className="flex flex-wrap gap-4 items-center">

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-background text-foreground"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <Input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-28"
        />

        <Input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-28"
        />

        {/* RESET */}
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setCategory("all");
            setMinPrice("");
            setMaxPrice("");
          }}
        >
          Reset
        </Button>
      </div>

      {/* 🧱 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
          <Link key={product.id} href={`/product/${product.id}`}>

            <Card className="overflow-hidden hover:shadow-xl transition group cursor-pointer">
              <CardContent className="p-0">

                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300";
                    }}
                    className="w-full h-48 object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* INFO */}
                <div className="p-4 space-y-3">

                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg">{product.name}</p>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>

                  <p className="text-muted-foreground">
                    ${product.price.toFixed(2)}
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
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>

                </div>

              </CardContent>
            </Card>

          </Link>
        ))}
      </div>

      {/* EMPTY */}
      {filteredProducts.length === 0 && (
        <p className="text-muted-foreground text-center py-10">
          No products found 😢
        </p>
      )}
    </div>
  );
}