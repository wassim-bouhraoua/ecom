"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Cart item = product + quantity
type CartItem = Product & {
  quantity: number;
};

// What we share across the app
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

// Create global cart
const CartContext = createContext<CartContextType | null>(null);

// Provider wraps the app
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage (once)
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        // increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // add new product
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Decrease quantity
  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // remove if 0
    );
  };

  // Remove item completely
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Calculate total price
  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Provide cart to all components
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart anywhere
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}