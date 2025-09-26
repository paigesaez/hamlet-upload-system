'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import HomePage from './HomePage';

export default function HamletDashboard() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLocationSelect = useCallback((locationId: string, name: string) => {
    setSelectedLocation(locationId);
    setLocationName(name);
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
          sidebarCollapsed={isSidebarCollapsed}
        />
      ) : (
        <HomePage sidebarCollapsed={isSidebarCollapsed} />
      )}
    </div>
  );
}