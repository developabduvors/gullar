"use client";

import { useState, useCallback, useMemo } from "react";
import type { Flower } from "@/types";

const FAVORITES_STORAGE_KEY = "prestige_favorites";

function loadFavoritesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(ids: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    loadFavoritesFromStorage
  );

  const favoritesCount = useMemo(() => favoriteIds.length, [favoriteIds]);

  const isFavorite = useCallback(
    (flowerId: string) => favoriteIds.includes(flowerId),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((flowerId: string) => {
    setFavoriteIds((prev) => {
      const isExists = prev.includes(flowerId);
      const newIds = isExists
        ? prev.filter((id) => id !== flowerId)
        : [...prev, flowerId];
      saveFavoritesToStorage(newIds);
      return newIds;
    });
  }, []);

  const addFavorite = useCallback((flowerId: string) => {
    setFavoriteIds((prev) => {
      if (prev.includes(flowerId)) return prev;
      const newIds = [...prev, flowerId];
      saveFavoritesToStorage(newIds);
      return newIds;
    });
  }, []);

  const removeFavorite = useCallback((flowerId: string) => {
    setFavoriteIds((prev) => {
      const newIds = prev.filter((id) => id !== flowerId);
      saveFavoritesToStorage(newIds);
      return newIds;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
    saveFavoritesToStorage([]);
  }, []);

  const getFavoriteFlowers = useCallback(
    (flowers: Flower[]) => {
      return flowers.filter((f) => favoriteIds.includes(f.id));
    },
    [favoriteIds]
  );

  return {
    favoriteIds,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    getFavoriteFlowers,
  };
}
