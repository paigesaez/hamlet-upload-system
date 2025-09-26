'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import PageHeader from './PageHeader';
import TabNavigation, { TabType } from './TabNavigation';

interface Project {
  id: string;
  type: 'City Council' | 'Planning Commission';
  title: string;
  date: string;
  location: string;
  address?: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    type: 'City Council',
    title: 'River Grove Mobile Home Park at 8440 U.S. Highway 1',
    date: '2025-09-04',
    location: 'Brevard County, Florida',
    address: '8440 U.S. Highway 1'
  },
  {
    id: '2',
    type: 'Planning Commission',
    title: 'Van Greenby Road Tree Hearing',
    date: '2025-09-04',
    location: 'Lowell, Massachusetts'
  },
  {
    id: '3',
    type: 'Planning Commission',
    title: 'Metropolitan Branch Trail Upgrades',
    date: '2025-09-04',
    location: 'Montgomery County, Maryland'
  },
  {
    id: '4',
    type: 'City Council',
    title: 'Flex Warehouse at 4150 Highway 1',
    date: '2025-09-04',
    location: 'Brevard County, Florida',
    address: '4150 Highway 1'
  },
  {
    id: '5',
    type: 'Planning Commission',
    title: '7025 Strathmore Street',
    date: '2025-09-04',
    location: 'Chevy Chase, Maryland'
  }
];

interface HomePageProps {
  sidebarCollapsed?: boolean;
}

export default function HomePage({ sidebarCollapsed = false }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [locationFilter, setLocationFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [bodyFilter, setBodyFilter] = useState('all');

  const handleProjectClick = useCallback((projectId: string) => {
    // Open project detail page in new tab
    window.open(`/hamlet-dashboard/project/${projectId}`, '_blank');
  }, []);

  const clearFilters = useCallback(() => {
    setLocationFilter('all');
    setYearFilter('all');
    setBodyFilter('all');
  }, []);

  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      onClick={() => handleProjectClick(project.id)}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-xs text-gray-500 font-medium">
            {project.type}
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
          </div>
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
      <div className="px-8 py-6">
        {activeTab === 'projects' ? (
          <>
            {/* Section Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-5">Recent Projects</h2>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <div className="relative">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All locations</option>
                    <option value="florida">Florida</option>
                    <option value="massachusetts">Massachusetts</option>
                    <option value="maryland">Maryland</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Year</label>
                <div className="relative">
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All years</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Governing Body:</label>
                <div className="relative">
                  <select
                    value={bodyFilter}
                    onChange={(e) => setBodyFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All bodies</option>
                    <option value="city-council">City Council</option>
                    <option value="planning">Planning Commission</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

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
              {mockProjects.map(renderProjectCard)}
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