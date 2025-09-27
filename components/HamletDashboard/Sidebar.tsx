'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, Menu, X, Lock, LogOut, HelpCircle, ChevronLeft, Trash2 } from 'lucide-react';
import locationsData from '@/data/mock-data/locations.json';

const locations = locationsData;
import { useSavedSearches } from '@/hooks/useSavedSearches';

interface SidebarProps {
  selectedLocation: string;
  onLocationSelect: (locationId: string) => void;
  onLogoClick?: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  isSearchPage?: boolean;
}

export default function Sidebar({ selectedLocation, onLocationSelect, onLogoClick, isOpen, onToggle, isCollapsed, onCollapsedChange, isSearchPage = false }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set(['ca']));
  const [locationsExpanded, setLocationsExpanded] = useState(!isSearchPage); // Collapsed on search page
  const [savedSearchesExpanded, setSavedSearchesExpanded] = useState(true); // Always expanded by default
  const { savedSearches, removeSearch } = useSavedSearches();

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;

    const query = searchQuery.toLowerCase();
    return locations.map(state => ({
      ...state,
      children: state.children?.filter(city =>
        city.name.toLowerCase().includes(query) ||
        state.name.toLowerCase().includes(query)
      )
    })).filter(state =>
      state.name.toLowerCase().includes(query) ||
      (state.children && state.children.length > 0)
    );
  }, [searchQuery]);

  const toggleState = (stateId: string) => {
    const newExpanded = new Set(expandedStates);
    if (newExpanded.has(stateId)) {
      newExpanded.delete(stateId);
    } else {
      newExpanded.add(stateId);
    }
    setExpandedStates(newExpanded);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Just blur the input on Enter to apply the search
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full ${isCollapsed ? 'w-[60px]' : 'w-[280px]'} bg-[#1e293b] text-white z-40
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 shadow-2xl
      `}>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => onCollapsedChange(!isCollapsed)}
          className="absolute -right-3 top-8 bg-[#1e293b] hover:bg-[#2a3f5f] border border-gray-600 rounded-full p-1.5 hidden lg:flex items-center justify-center transition-colors z-50"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
        {/* Header */}
        <div className="p-5 border-b border-gray-700/50">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-semibold flex-shrink-0">
              H
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-semibold">Hamlet</h1>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            )}
          </div>

        </div>

        {/* Saved Searches Section */}
        {!isCollapsed && (
          <div className="px-5 py-3 border-b border-gray-700/50">
            <button
              onClick={() => setSavedSearchesExpanded(!savedSearchesExpanded)}
              className="flex items-center justify-between w-full mb-3 group"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Saved Searches</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${savedSearchesExpanded ? '' : '-rotate-90'}`} />
            </button>
            {savedSearchesExpanded && (
              <div className="space-y-2">
                {/* Show saved searches if they exist, otherwise show prompt */}
                {savedSearches.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-400 italic">
                    <p className="mb-2">No saved searches yet.</p>
                    <p className="text-xs">Use the global search above to find content, then save your frequent searches here for quick access.</p>
                  </div>
                ) : (
                  <>
                    {savedSearches.map(search => {
                      // Build URL with filters
                      const params = new URLSearchParams();
                      params.set('q', search.query);
                      if (search.filters?.type && search.filters.type !== 'all') {
                        params.set('type', search.filters.type);
                      }
                      if (search.filters?.location && search.filters.location !== 'all') {
                        params.set('location', search.filters.location);
                      }

                      return (
                        <div key={search.id} className="group flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-[#2a3f5f] rounded-lg transition-colors">
                          <a
                            href={`/hamlet-dashboard/search?${params.toString()}`}
                            className="flex items-center gap-2 flex-1"
                          >
                            <Search size={14} className="text-gray-400" />
                            <span className="truncate">{search.name}</span>
                          </a>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeSearch(search.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          >
                            <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* All Locations Section */}
        <div className="flex-1 p-5 overflow-hidden">
          {!isCollapsed && (
            <button
              onClick={() => setLocationsExpanded(!locationsExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">All Locations</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${locationsExpanded ? '' : '-rotate-90'}`} />
            </button>
          )}

          {/* Search Bar - Only show when locations section is expanded */}
          {!isCollapsed && locationsExpanded && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search Cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-[#2a3f5f] hover:bg-[#324560] rounded-lg pl-10 pr-10 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Location Tree */}
          {!isCollapsed && locationsExpanded && (
          <div className="space-y-0.5 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar">
            {filteredLocations.map((state) => (
              <div key={state.id}>
                <button
                  onClick={() => toggleState(state.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[#2a3f5f] rounded-lg transition-colors group"
                >
                  {expandedStates.has(state.id) ? (
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                  )}
                  <span className="font-medium">{state.name}</span>
                </button>

                {expandedStates.has(state.id) && state.children && (
                  <div className="ml-7 space-y-0.5 mt-1">
                    {state.children.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          if (city.isLocked) {
                            alert('Upgrade to Premium to access this location');
                          } else {
                            onLocationSelect(city.id);
                          }
                        }}
                        className={`
                          w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center justify-between
                          ${city.isLocked
                            ? 'opacity-60 hover:bg-[#2a3f5f] cursor-not-allowed'
                            : selectedLocation === city.id
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                              : 'hover:bg-[#2a3f5f] text-gray-300 hover:text-white'
                          }
                        `}
                      >
                        <span className="pl-2">{city.name}</span>
                        {city.isLocked && (
                          <Lock size={14} className="text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-700/50 bg-[#1e293b] z-10">
          {!isCollapsed ? (
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#2a3f5f] rounded-lg transition-colors flex items-center gap-2">
                <HelpCircle size={16} />
                <span>Contact Support</span>
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#2a3f5f] rounded-lg transition-colors flex items-center gap-2">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button className="text-gray-400 hover:text-white transition-colors">
                <HelpCircle size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
