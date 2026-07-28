"use client";

import { createContext, useContext, useMemo, useState } from "react";

import { CartSidebar, type CartItem } from "./cart-sidebar";

type NewCartItem = Omit<CartItem, "quantity">;

type CartContextValue = {
  addCartItem: (item: NewCartItem) => void;
  itemCount: number;
  openCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function addCartItem(item: NewCartItem) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function updateCartItemQuantity(id: string, quantity: number) {
    setCartItems((currentItems) =>
      quantity <= 0
        ? currentItems.filter((item) => item.id !== id)
        : currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }

  function removeCartItem(id: string) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function checkoutCart() {
    if (!cartItems.length) {
      return;
    }

    window.alert("Thanks! Checkout is ready to connect to payments.");
  }

  const value = useMemo<CartContextValue>(
    () => ({
      addCartItem,
      itemCount,
      openCart: () => setIsCartOpen(true),
    }),
    [itemCount],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSidebar
        isOpen={isCartOpen}
        items={cartItems}
        onCheckout={checkoutCart}
        onClear={() => setCartItems([])}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeCartItem}
        onUpdateQuantity={updateCartItemQuantity}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
