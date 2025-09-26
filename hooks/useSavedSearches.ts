'use client';

import { useState, useEffect } from 'react';

export interface SavedSearch {
  id: string;
  query: string;
  name: string;
  createdAt: string;
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

  // Save a new search
  const saveSearch = (query: string, name?: string) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      query,
      name: name || query,
      createdAt: new Date().toISOString()
    };

    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('hamlet-saved-searches', JSON.stringify(updated));

    return newSearch;
  };

  // Remove a saved search
  const removeSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id);
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
    clearSearches
  };
}