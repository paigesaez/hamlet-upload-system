'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import HomePage from './HomePage';
import locationsData from '@/data/mock-data/locations.json';

const locations = locationsData;

export default function HamletDashboard() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLocationSelect = useCallback((locationId: string) => {
    setSelectedLocation(locationId);

    let resolvedName = '';
    for (const state of locations) {
      if (state.id === locationId) {
        resolvedName = `${state.name}, ${state.state}`;
        break;
      }
      if (state.children) {
        const city = state.children.find(child => child.id === locationId);
        if (city) {
          resolvedName = `${city.name}, ${city.state}`;
          break;
        }
      }
    }

    setLocationName(resolvedName);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    setSelectedLocation('');
    setLocationName('');
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
        onLogoClick={handleLogoClick}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />
      {selectedLocation ? (
        <Dashboard
          selectedLocation={selectedLocation}
          locationName={locationName}
        />
      ) : (
        <HomePage sidebarCollapsed={isSidebarCollapsed} />
      )}
    </div>
  );
}
