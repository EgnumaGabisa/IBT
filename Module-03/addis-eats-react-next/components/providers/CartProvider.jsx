"use client";

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);