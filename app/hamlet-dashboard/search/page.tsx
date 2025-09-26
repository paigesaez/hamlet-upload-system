'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Calendar, MapPin, FileText, ChevronRight, Filter } from 'lucide-react';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import Link from 'next/link';
import PageHeader from '@/components/HamletDashboard/PageHeader';

interface SearchResult {
  id: string;
  title: string;
  type: 'meeting' | 'project' | 'agenda' | 'document';
  location: string;
  date?: string;
  excerpt: string;
  relevance: number;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Q4 2024 Budget Review Meeting',
    type: 'meeting',
    location: 'Los Angeles, CA',
    date: 'December 15, 2024',
    excerpt: 'Discussion of budget allocations for Q4 2024 including infrastructure improvements and community programs...',
    relevance: 95
  },
  {
    id: '2',
    title: 'Infrastructure Development Project',
    type: 'project',
    location: 'San Francisco, CA',
    date: 'January 2025',
    excerpt: 'Major infrastructure development initiative focused on improving transportation systems and public facilities...',
    relevance: 88
  },
  {
    id: '3',
    title: 'City Council Meeting Agenda',
    type: 'agenda',
    location: 'San Diego, CA',
    date: 'December 20, 2024',
    excerpt: 'Agenda items include zoning changes, budget approvals, and community development initiatives...',
    relevance: 82
  },
  {
    id: '4',
    title: 'Environmental Impact Assessment',
    type: 'document',
    location: 'Sacramento, CA',
    date: 'November 2024',
    excerpt: 'Comprehensive environmental impact assessment for proposed development projects in the Sacramento region...',
    relevance: 75
  },
  {
    id: '5',
    title: 'Community Engagement Meeting',
    type: 'meeting',
    location: 'Fresno, CA',
    date: 'December 18, 2024',
    excerpt: 'Public forum for community members to discuss local issues and provide feedback on city initiatives...',
    relevance: 70
  }
];

const typeColors = {
  meeting: 'bg-blue-100 text-blue-800',
  project: 'bg-green-100 text-green-800',
  agenda: 'bg-purple-100 text-purple-800',
  document: 'bg-orange-100 text-orange-800'
};

const typeIcons = {
  meeting: Calendar,
  project: FileText,
  agenda: FileText,
  document: FileText
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const { saveSearch, savedSearches } = useSavedSearches();

  useEffect(() => {
    // Simulate filtering based on query
    if (query) {
      const results = mockSearchResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                            result.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                            result.location.toLowerCase().includes(query.toLowerCase());

        const matchesType = selectedTypes.size === 0 || selectedTypes.has(result.type);
        const matchesLocation = selectedLocations.size === 0 ||
                               Array.from(selectedLocations).some(loc =>
                                 result.location.toLowerCase().includes(loc.toLowerCase())
                               );

        return matchesQuery && matchesType && matchesLocation;
      });

      // Sort by relevance
      results.sort((a, b) => b.relevance - a.relevance);
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [query, selectedTypes, selectedLocations]);

  const toggleType = (type: string) => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  const toggleLocation = (location: string) => {
    const newLocations = new Set(selectedLocations);
    if (newLocations.has(location)) {
      newLocations.delete(location);
    } else {
      newLocations.add(location);
    }
    setSelectedLocations(newLocations);
  };

  const clearFilters = () => {
    setSelectedTypes(new Set());
    setSelectedLocations(new Set());
  };

  const uniqueLocations = Array.from(new Set(mockSearchResults.map(r => r.location.split(',')[0])));

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
            <div className="flex items-center justify-between">
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-2 text-sm">
                <Link href="/hamlet-dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-gray-900 font-medium">Search Results</span>
              </nav>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
                {(selectedTypes.size > 0 || selectedLocations.size > 0) && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {selectedTypes.size + selectedLocations.size}
                  </span>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <div className="flex items-start gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={query}
                    readOnly
                    className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-3 text-lg font-medium"
                    placeholder="Search query..."
                  />
                </div>
                <button
                  onClick={() => {
                    const isAlreadySaved = savedSearches.some(s => s.query === query);
                    if (!isAlreadySaved) {
                      saveSearch(query);
                      alert(`Search "${query}" has been saved!`);
                    } else {
                      alert('This search is already saved');
                    }
                  }}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.667 1.333H3.333c-.733 0-1.333.6-1.333 1.334v10.666c0 .734.6 1.334 1.333 1.334H12.667c.733 0 1.333-.6 1.333-1.334V2.667c0-.734-.6-1.334-1.333-1.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.333 7.333L7.333 9.333L10.667 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Save Search
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredResults.length} results for &quot;{query}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  {(selectedTypes.size > 0 || selectedLocations.size > 0) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Type</h4>
                  <div className="space-y-2">
                    {['meeting', 'project', 'agenda', 'document'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(type)}
                          onChange={() => toggleType(type)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{type}s</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Location</h4>
                  <div className="space-y-2">
                    {uniqueLocations.map(location => (
                      <label key={location} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLocations.has(location)}
                          onChange={() => toggleLocation(location)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => {
                  const Icon = typeIcons[result.type];
                  return (
                    <div
                      key={result.id}
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
    </div>
  );
}