"use client";

import { useEffect } from "react";
import { products } from "@/app/data/products";

export default function InitProducts() {
  useEffect(() => {
    const existing = localStorage.getItem("products");

    if (!existing) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, []);

  return null;
}