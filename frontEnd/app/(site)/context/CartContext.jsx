"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ------------------ Load from localStorage ------------------ */
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  /* ------------------ Save to localStorage ------------------ */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ------------------ Add to cart ------------------ */
  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);

      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.stock ?? Infinity,
                  item.quantity + product.quantity
                )
              }
            : item
        );
      }

      return [
        ...prevCart,
        { ...product, quantity: product.quantity || 1 }
      ];
    });

    setIsCartOpen(true); // 👈 مثل elecmake
  };

  /* ------------------ Update quantity ------------------ */
  const updateQuantity = (id, quantity) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id !== id) return item;

        const finalQty = item.stock
          ? Math.min(item.stock, Math.max(1, quantity))
          : Math.max(1, quantity);

        return { ...item, quantity: finalQty };
      })
    );
  };

  /* ------------------ Remove ------------------ */
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
