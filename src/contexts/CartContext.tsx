"use client";

import React, { createContext, useContext } from "react";
import { CartItem, CartContextType } from "@/types/cart";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const CartContext = createContext<CartContextType | undefined>(undefined);

function dedupeCart(items: CartItem[]): CartItem[] {
  const valid = items.filter((item) => item && item._id);
  return Array.from(
    new Map(valid.map((item) => [item._id, item])).values()
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", [], dedupeCart);

  const addToCart = (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
