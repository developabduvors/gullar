"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { api } from "@/lib/api";
import { API, UI } from "@/lib/constants";
import type { Flower, SearchResult } from "@/types";

interface UseSearchReturn {
  query: string;
  results: Flower[];
  isSearching: boolean;
  isOpen: boolean;
  setQuery: (query: string) => void;
  closeSearch: () => void;
  error: string | null;
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Flower[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, UI.DEBOUNCE_MS);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < UI.SEARCH_MIN_CHARS) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    let cancelled = false;

    async function fetchResults() {
      setIsSearching(true);
      setError(null);

      try {
        const response = await api.get<SearchResult>(
          `${API.ENDPOINTS.SEARCH}?q=${encodeURIComponent(debouncedQuery)}&limit=6`
        );
        if (!cancelled) {
          setResults(response.flowers || []);
          setIsOpen(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Search failed");
          setResults([]);
        }
      } finally {
        if (!cancelled) {
          setIsSearching(false);
        }
      }
    }

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
  };

  return {
    query,
    results,
    isSearching,
    isOpen,
    setQuery,
    closeSearch,
    error,
  };
}
