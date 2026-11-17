import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addItem: (item) => set((state) => ({ cart: [...state.cart, item] })),
  clearCart: () => set({ cart: [] }),
}));