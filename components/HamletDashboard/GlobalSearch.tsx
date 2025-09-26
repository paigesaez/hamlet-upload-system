'use client';

import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleGlobalSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      // Open search results in new tab
      window.open(`/hamlet-dashboard/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  }, [searchQuery]);

  return (
    <div className="relative w-96">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Search across all locations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleGlobalSearch}
        className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-colors"
      />
    </div>
  );
}