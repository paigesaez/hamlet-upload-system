'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from '@/components/HamletDashboard/Sidebar';
import { useRouter, usePathname } from 'next/navigation';
import { locations } from '@/components/HamletDashboard/mockData';

export default function HamletDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract location from URL if on a location page
  const locationFromUrl = pathname.match(/\/hamlet-dashboard\/location\/([^/]+)/)?.[1] || '';

  const [selectedLocation, setSelectedLocation] = useState(locationFromUrl);
  const [locationName, setLocationName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sync location state with URL
  useEffect(() => {
    const locationFromUrl = pathname.match(/\/hamlet-dashboard\/location\/([^/]+)/)?.[1] || '';
    setSelectedLocation(locationFromUrl);

    // Find location name from data
    if (locationFromUrl) {
      for (const state of locations) {
        if (state.children) {
          const city = state.children.find(c => c.id === locationFromUrl);
          if (city) {
            setLocationName(`${city.name}, ${city.state}`);
            break;
          }
        }
      }
    }
  }, [pathname]);

  const handleLocationSelect = useCallback((locationId: string, name: string) => {
    setSelectedLocation(locationId);
    setLocationName(name);
    // Navigate to location page
    router.push(`/hamlet-dashboard/location/${locationId}`);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [router]);

  const handleLogoClick = useCallback(() => {
    setSelectedLocation('');
    setLocationName('');
    router.push('/hamlet-dashboard');
  }, [router]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const isSearchPage = pathname.includes('/search');

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
        isSearchPage={isSearchPage}
      />
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-[60px]' : 'lg:ml-[280px]'
      }`}>
        {children}
      </div>
    </div>
  );
}