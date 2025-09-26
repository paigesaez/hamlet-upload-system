'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Calendar, MapPin, FileText, ChevronRight, Building } from 'lucide-react';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import Link from 'next/link';
import PageHeader from '@/components/HamletDashboard/PageHeader';
import FilterSelect from '@/components/shared/FilterSelect';
import { SearchResult, getAllCachedSearchResults } from '@/utils/searchCache';

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  project: 'bg-green-100 text-green-800',
  agenda: 'bg-purple-100 text-purple-800'
};

const typeIcons = {
  meeting: Calendar,
  project: Building,
  agenda: FileText
};

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const typeFromUrl = searchParams.get('type') || 'all';
  const locationFromUrl = searchParams.get('location') || 'all';

  const [allResults, setAllResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
  const [selectedLocation, setSelectedLocation] = useState<string>(locationFromUrl);
  const { saveSearch, savedSearches } = useSavedSearches();

  // Get unique locations from all results
  const uniqueLocations = useMemo(() => {
    const locs = new Set(allResults.map(r => r.location));
    return Array.from(locs).sort();
  }, [allResults]);

  // Load all data on mount
  useEffect(() => {
    const data = getAllCachedSearchResults();
    setAllResults(data);
  }, []);

  // Filter results based on query and filters
  useEffect(() => {
    if (query) {
      let results = allResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                            result.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                            result.location.toLowerCase().includes(query.toLowerCase());

        const matchesType = selectedType === 'all' || result.type === selectedType;
        const matchesLocation = selectedLocation === 'all' || result.location === selectedLocation;

        return matchesQuery && matchesType && matchesLocation;
      });

      // Sort by relevance and limit to top 100 results
      results = results.sort((a, b) => b.relevance - a.relevance).slice(0, 100);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [query, selectedType, selectedLocation, allResults]);

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedLocation('all');
  };

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the appropriate detail page based on type
    switch(result.type) {
      case 'meeting':
        router.push(`/hamlet-dashboard/meeting/${result.id}`);
        break;
      case 'project':
        router.push(`/hamlet-dashboard/project/${result.id}`);
        break;
      case 'agenda':
        router.push(`/hamlet-dashboard/agenda/${result.id}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Search Results"
        subtitle={`Found ${filteredResults.length} results for "${query}"`}
        showSearch={false}
      />

      {/* Secondary Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link href="/hamlet-dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-900 font-medium">Search Results</span>
            </nav>

            {/* Search Bar with Inline Filters */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={query}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-2.5 text-base font-medium"
                    placeholder="Search query..."
                  />
                </div>

                {/* Type Filter */}
                <FilterSelect
                  value={selectedType}
                  onChange={setSelectedType}
                  inline={true}
                  options={[
                    { value: 'all', label: 'All Types' },
                    { value: 'meeting', label: 'Meetings' },
                    { value: 'project', label: 'Projects' },
                    { value: 'agenda', label: 'Agendas' }
                  ]}
                />

                {/* Location Filter */}
                <FilterSelect
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  inline={true}
                  options={[
                    { value: 'all', label: 'All Locations' },
                    ...uniqueLocations.map(location => ({
                      value: location,
                      label: location
                    }))
                  ]}
                />

                {/* Clear Filters */}
                {(selectedType !== 'all' || selectedLocation !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear filters
                  </button>
                )}

                {/* Save Search Button */}
                <button
                  onClick={() => {
                    const isAlreadySaved = savedSearches.some(s =>
                      s.query === query &&
                      s.filters?.type === selectedType &&
                      s.filters?.location === selectedLocation
                    );
                    if (!isAlreadySaved) {
                      const filters = {
                        type: selectedType !== 'all' ? selectedType : undefined,
                        location: selectedLocation !== 'all' ? selectedLocation : undefined
                      };
                      saveSearch(query, undefined, filters);
                    }
                  }}
                  disabled={savedSearches.some(s =>
                    s.query === query &&
                    s.filters?.type === selectedType &&
                    s.filters?.location === selectedLocation
                  )}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    savedSearches.some(s =>
                      s.query === query &&
                      s.filters?.type === selectedType &&
                      s.filters?.location === selectedLocation
                    )
                      ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.667 1.333H3.333c-.733 0-1.333.6-1.333 1.334v10.666c0 .734.6 1.334 1.333 1.334H12.667c.733 0 1.333-.6 1.333-1.334V2.667c0-.734-.6-1.334-1.333-1.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.333 7.333L7.333 9.333L10.667 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {savedSearches.some(s =>
                    s.query === query &&
                    s.filters?.type === selectedType &&
                    s.filters?.location === selectedLocation
                  ) ? 'Saved' : 'Save'}
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Found {filteredResults.length} results {query && `for "${query}"`}
                {selectedType !== 'all' && ` • Type: ${selectedType}`}
                {selectedLocation !== 'all' && ` • Location: ${selectedLocation}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results */}
        <div>
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => {
                  const Icon = typeIcons[result.type];
                  return (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[result.type]}`}>
                              <Icon size={12} className="mr-1" />
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <MapPin size={12} />
                              <span>{result.location}</span>
                            </div>
                            {result.date && (
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar size={12} />
                                <span>{result.date}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2">
                            {result.excerpt}
                          </p>
                        </div>
                        <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No results found</p>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your search query or filters
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading search...</div>
    </div>}>
      <SearchContent />
    </Suspense>
  );
}
