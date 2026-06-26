"use client";

import { useState, useCallback, useMemo } from "react";
import type { CartItem, Flower, CartState } from "@/types";

const CART_STORAGE_KEY = "premium_bloom_cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  const cartState: CartState = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    [items]
  );

  const addItem = useCallback(
    (flower: Flower, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.flower.id === flower.id);
        let newItems: CartItem[];

        if (existing) {
          newItems = prev.map((item) =>
            item.flower.id === flower.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newItems = [
            ...prev,
            {
              id: `${flower.id}-${Date.now()}`,
              flower,
              quantity,
              price: flower.price,
            },
          ];
        }

        saveCartToStorage(newItems);
        return newItems;
      });
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== itemId);
      saveCartToStorage(newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity < 1) {
        removeItem(itemId);
        return;
      }

      setItems((prev) => {
        const newItems = prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        saveCartToStorage(newItems);
        return newItems;
      });
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCartToStorage([]);
  }, []);

  const isInCart = useCallback(
    (flowerId: string) => items.some((item) => item.flower.id === flowerId),
    [items]
  );

  return {
    ...cartState,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
  };
}
