'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import PageHeader from './PageHeader';
import TabNavigation, { TabType } from './TabNavigation';
import FilterSelect from '../shared/FilterSelect';
import { SearchResult, getAllCachedSearchResults } from '@/utils/searchCache';
import { initializeSearchCache } from '@/utils/initializeCache';

interface HomePageProps {
  sidebarCollapsed?: boolean;
}

const fallbackProjects: SearchResult[] = [
  {
    id: 'fallback-1',
    title: 'River Grove Mobile Home Park at 8440 U.S. Highway 1',
    type: 'project',
    category: 'City Council',
    date: '2025-09-04',
    location: 'Brevard County, Florida',
    locationId: 'fallback-fl-1',
    address: '8440 U.S. Highway 1',
    excerpt: 'Proposal for the development of a new mobile home park community featuring 150 units with modern amenities.',
    relevance: 85,
    status: 'under-review'
  },
  {
    id: 'fallback-2',
    title: 'Van Greenby Road Tree Hearing',
    type: 'project',
    category: 'Planning Commission',
    date: '2025-09-04',
    location: 'Lowell, Massachusetts',
    locationId: 'fallback-ma-1',
    excerpt: 'Planning commission hearing to review the preservation plan for Van Greenby Road tree canopy.',
    relevance: 80
  },
  {
    id: 'fallback-3',
    title: 'Metropolitan Branch Trail Upgrades',
    type: 'project',
    category: 'Planning Commission',
    date: '2025-09-04',
    location: 'Montgomery County, Maryland',
    locationId: 'fallback-md-1',
    excerpt: 'Trail upgrades focused on lighting, safety improvements, and expanded bike lanes along the Metropolitan Branch corridor.',
    relevance: 78
  },
  {
    id: 'fallback-4',
    title: 'Flex Warehouse at 4150 Highway 1',
    type: 'project',
    category: 'City Council',
    date: '2025-09-04',
    location: 'Brevard County, Florida',
    locationId: 'fallback-fl-2',
    address: '4150 Highway 1',
    excerpt: 'Proposal to convert an existing structure into a flexible warehouse and light industrial use facility.',
    relevance: 75,
    status: 'pending'
  },
  {
    id: 'fallback-5',
    title: '7025 Strathmore Street',
    type: 'project',
    category: 'Planning Commission',
    date: '2025-09-04',
    location: 'Chevy Chase, Maryland',
    locationId: 'fallback-md-2',
    excerpt: 'Review of a mixed-use infill development with street-level retail and 48 residential units.',
    relevance: 74
  }
];

export default function HomePage({ sidebarCollapsed = false }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [locationFilter, setLocationFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [bodyFilter, setBodyFilter] = useState('all');
  const [projects, setProjects] = useState<SearchResult[]>(fallbackProjects);
  const [filteredProjects, setFilteredProjects] = useState<SearchResult[]>(fallbackProjects);

  const handleProjectClick = useCallback((projectId: string) => {
    window.open(`/hamlet-dashboard/project/${projectId}`, '_blank');
  }, []);

  const clearFilters = useCallback(() => {
    setLocationFilter('all');
    setYearFilter('all');
    setBodyFilter('all');
  }, []);

  useEffect(() => {
    // Initialize the cache on first load
    initializeSearchCache();

    const cachedProjects = getAllCachedSearchResults().filter(result => result.type === 'project');
    if (cachedProjects.length > 0) {
      const sorted = cachedProjects.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      setProjects(sorted);
      setFilteredProjects(sorted);
    }
  }, []);

  useEffect(() => {
    const next = projects.filter(project => {
      const matchesLocation = locationFilter === 'all' || project.location === locationFilter;
      const matchesYear = yearFilter === 'all' || (project.date && project.date.startsWith(yearFilter));
      const matchesBody = bodyFilter === 'all' || project.category === bodyFilter;
      return matchesLocation && matchesYear && matchesBody;
    });

    const sorted = next.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    setFilteredProjects(sorted);
  }, [projects, locationFilter, yearFilter, bodyFilter]);

  const locationOptions = useMemo(() => {
    const uniques = new Set(projects.map(project => project.location).filter(Boolean));
    return Array.from(uniques).sort();
  }, [projects]);

  const yearOptions = useMemo(() => {
    const uniques = new Set(
      projects
        .map(project => project.date?.slice(0, 4))
        .filter((year): year is string => Boolean(year))
    );
    return Array.from(uniques).sort((a, b) => Number(b) - Number(a));
  }, [projects]);

  const bodyOptions = useMemo(() => {
    const uniques = new Set(
      projects
        .map(project => project.category)
        .filter((category): category is string => Boolean(category))
    );
    return Array.from(uniques).sort();
  }, [projects]);

  const renderProjectCard = (project: SearchResult) => (
    <div
      key={project.id}
      onClick={() => handleProjectClick(project.id)}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-xs text-gray-500 font-medium">
            {project.category || 'Project'}
          </span>
          <h3 className="text-base font-semibold text-gray-900 mt-1 mb-3 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span>{project.location}</span>
            </div>
            {project.status && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                {project.status.replace(/-/g, ' ')}
              </span>
            )}
          </div>
          {project.address && (
            <p className="text-sm text-gray-500 mt-2">{project.address}</p>
          )}
          {project.excerpt && (
            <p className="text-sm text-gray-500 mt-3 line-clamp-2">{project.excerpt}</p>
          )}
        </div>
        <ChevronRight size={20} className="text-gray-400 mt-1 group-hover:text-gray-600 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader
        title="Welcome, Hamlet"
        subtitle="Here's what's going on in your cities"
      />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      <div className={`px-8 py-6 ${sidebarCollapsed ? 'lg:pl-24' : ''}`}>
        {activeTab === 'projects' ? (
          <>
            {/* Section Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-5">Recent Projects</h2>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <FilterSelect
                label="Location"
                value={locationFilter}
                onChange={setLocationFilter}
                options={[
                  { value: 'all', label: 'All locations' },
                  ...locationOptions.map(location => ({ value: location, label: location }))
                ]}
                className="w-56"
              />

              <FilterSelect
                label="Year"
                value={yearFilter}
                onChange={setYearFilter}
                options={[
                  { value: 'all', label: 'All years' },
                  ...yearOptions.map(year => ({ value: year, label: year }))
                ]}
                className="w-36"
              />

              <FilterSelect
                label="Governing Body"
                value={bodyFilter}
                onChange={setBodyFilter}
                options={[
                  { value: 'all', label: 'All bodies' },
                  ...bodyOptions.map(body => ({ value: body, label: body }))
                ]}
                className="w-48"
              />

              {(locationFilter !== 'all' || yearFilter !== 'all' || bodyFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Project Cards */}
            <div className="space-y-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map(renderProjectCard)
              ) : (
                <div className="bg-white border border-dashed border-gray-300 rounded-lg p-6 text-center text-sm text-gray-500">
                  No projects match the selected filters yet.
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'meetings' ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Meetings view coming soon</p>
            <p className="text-sm text-gray-400 mt-2">
              Select a location from the sidebar to view meetings
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Agendas view coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
