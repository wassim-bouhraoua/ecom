"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { products, Product } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

// ✅ shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

    addToCart({
      ...product,
      image: product.images?.[0] || "/placeholder.png",
    });

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
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
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