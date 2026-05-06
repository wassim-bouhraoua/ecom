"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "@/app/context/AuthContext";

// Product
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedOptions?: Record<
    string,
    string
  >;
};

// Cart item
type CartItem = Product & {
  quantity: number;
};

// Context
type CartContextType = {
  cart: CartItem[];

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  decreaseQuantity: (
    id: string
  ) => void;

  clearCart: () => void;

  getTotal: () => number;
};

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const [cart, setCart] = useState<
    CartItem[]
  >([]);

  // LOAD backend cart
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    fetch(
      `/api/cart?user=${user.name}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCart(data.items || []);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [user]);

  // SAVE backend cart
  useEffect(() => {
    if (!user) return;

    fetch("/api/cart", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        user: user.name,
        items: cart,
      }),
    }).catch((error) => {
      console.error(error);
    });

  }, [cart, user]);

  // ADD
  const addToCart = (
    product: Product
  ) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) =>
          item.id === product.id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // DECREASE
  const decreaseQuantity = (
    id: string
  ) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // REMOVE
  const removeFromCart = (
    id: string
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // CLEAR
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL
  const getTotal = () => {
    return cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
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
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}