"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext"; // ✅ NEW

// Product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

// Cart item
type CartItem = Product & {
  quantity: number;
};

// Context type
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // ✅ NEW
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔑 get key per user
  const getCartKey = () => {
    return user ? `cart_${user.name}` : "cart_guest";
  };

  // 📦 load cart when user changes
  useEffect(() => {
    const key = getCartKey();
    const saved = localStorage.getItem(key);

    if (saved) {
      setCart(JSON.parse(saved));
    } else {
      setCart([]);
    }
  }, [user]);

  // 💾 save cart when it changes
  useEffect(() => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  // ➕ add item
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ➖ decrease
  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ❌ remove
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 🧹 clear
  const clearCart = () => setCart([]);

  // 💰 total
  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}