'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  wishlist: string[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      addItem: (item) => {
        const { items } = get();
        const existing = items.find(i => i.id === item.id && i.size === item.size && i.color === item.color);
        if (existing) {
          set({ items: items.map(i => i.id === item.id && i.size === item.size && i.color === item.color ? { ...i, quantity: i.quantity + item.quantity } : i) });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id, size, color) => {
        set({ items: get().items.filter(i => !(i.id === id && i.size === size && i.color === color)) });
      },
      updateQuantity: (id, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color);
          return;
        }
        set({ items: get().items.map(i => i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleWishlist: (id) => {
        const { wishlist } = get();
        if (wishlist.includes(id)) {
          set({ wishlist: wishlist.filter(w => w !== id) });
        } else {
          set({ wishlist: [...wishlist, id] });
        }
      },
      isInWishlist: (id) => get().wishlist.includes(id),
      getTotalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: 'sasthi-cart' }
  )
);
