"use client";

import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const cart = useCartStore((state) => state.cart);

  return (
    <header className="bg-amber-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Addis Eats (Mesob House)</h1>
      <div className="bg-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
        Cart: {cart.length} items
      </div>
    </header>
  );
}