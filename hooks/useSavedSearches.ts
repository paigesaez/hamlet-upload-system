'use client';

import { useState, useEffect } from 'react';

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

export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('hamlet-saved-searches');
    if (stored) {
      try {
        setSavedSearches(JSON.parse(stored));
      } catch (e) {
        console.error('Error loading saved searches:', e);
      }
    }
  }, []);

  // Save a new search with filters
  const saveSearch = (query: string, name?: string, filters?: { type?: string; location?: string }) => {
    const sanitizedFilters = filters
      ? {
          ...(filters.type ? { type: filters.type } : {}),
          ...(filters.location ? { location: filters.location } : {})
        }
      : undefined;

    const filtersForSave = sanitizedFilters && Object.keys(sanitizedFilters).length > 0
      ? sanitizedFilters
      : undefined;

    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query,
      name: name || query,
      createdAt: new Date().toISOString(),
      filters: filtersForSave
    };

    setSavedSearches(prev => {
      const updated = [...prev, newSearch];
      localStorage.setItem('hamlet-saved-searches', JSON.stringify(updated));
      return updated;
    });

    return newSearch;
  };

  // Remove a saved search
  const removeSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    localStorage.setItem('hamlet-saved-searches', JSON.stringify(updated));
  };

  // Update a saved search name
  const updateSearch = (id: string, newName: string) => {
    const updated = savedSearches.map(s =>
      s.id === id ? { ...s, name: newName } : s
    );
    setSavedSearches(updated);
    localStorage.setItem('hamlet-saved-searches', JSON.stringify(updated));
  };

  // Clear all saved searches
  const clearSearches = () => {
    setSavedSearches([]);
    localStorage.removeItem('hamlet-saved-searches');
  };

  return {
    savedSearches,
    saveSearch,
    removeSearch,
    updateSearch,
    clearSearches
  };
}
