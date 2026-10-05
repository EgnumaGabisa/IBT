"use client";

import { useCartStore } from "@/store/useCartStore";

export default function AddToCartButton({ dish }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(dish)}
      className="w-full bg-amber-700 text-white font-medium py-2 px-4 rounded-md hover:bg-amber-800 transition-colors"
    >
      Add to Order
    </button>
  );
}