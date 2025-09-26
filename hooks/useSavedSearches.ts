'use client';

import { useState, useEffect, useCallback } from 'react';

export interface SavedSearch {
  id: string;
  query: string;
  name: string;
  createdAt: string;
  filters?: {
    type?: string;
    location?: string;
  };
}

type SavedSearchListener = (searches: SavedSearch[]) => void;

const STORAGE_KEY = 'hamlet-saved-searches';
let cachedSearches: SavedSearch[] | null = null;
const listeners = new Set<SavedSearchListener>();

function readSavedSearches(): SavedSearch[] {
  if (typeof window === 'undefined') {
    return cachedSearches ?? [];
  }

  if (cachedSearches) {
    return cachedSearches;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    cachedSearches = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading saved searches:', error);
    cachedSearches = [];
  }

  return cachedSearches;
}

function persistSavedSearches(searches: SavedSearch[]) {
  cachedSearches = searches;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  }
  listeners.forEach((listener) => listener(searches));
}

export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => readSavedSearches());

  useEffect(() => {
    const listener: SavedSearchListener = (searches) => {
      setSavedSearches(searches);
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const saveSearch = useCallback((query: string, name?: string, filters?: { type?: string; location?: string }) => {
    const sanitizedFilters = filters
      ? {
          ...(filters.type ? { type: filters.type } : {}),
          ...(filters.location ? { location: filters.location } : {})
        }
      : undefined;

    const filtersForSave = sanitizedFilters && Object.keys(sanitizedFilters).length > 0
      ? sanitizedFilters
      : undefined;

    const existing = readSavedSearches();
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query,
      name: name || query,
      createdAt: new Date().toISOString(),
      filters: filtersForSave
    };

    const updated = [...existing, newSearch];
    persistSavedSearches(updated);

    return newSearch;
  }, []);

  const removeSearch = useCallback((id: string) => {
    const existing = readSavedSearches();
    const updated = existing.filter(s => s.id !== id);
    persistSavedSearches(updated);
  }, []);

  const updateSearch = useCallback((id: string, newName: string) => {
    const existing = readSavedSearches();
    const updated = existing.map(s =>
      s.id === id ? { ...s, name: newName } : s
    );
    persistSavedSearches(updated);
  }, []);

  const clearSearches = useCallback(() => {
    persistSavedSearches([]);
  }, []);

  return {
    savedSearches,
    saveSearch,
    removeSearch,
    updateSearch,
    clearSearches
  };
}
