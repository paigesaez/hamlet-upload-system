'use client';

import { useParams } from 'next/navigation';
import Dashboard from '@/components/HamletDashboard/Dashboard';
import { locations } from '@/components/HamletDashboard/mockData';

export default function LocationPage() {
  const params = useParams();
  const locationId = params.id as string;

  // Find location name from mock data
  let locationName = '';
  for (const state of locations) {
    if (state.children) {
      const city = state.children.find(c => c.id === locationId);
      if (city) {
        locationName = `${city.name}, ${city.state}`;
        break;
      }
    }
  }

  return (
    <Dashboard
      selectedLocation={locationId}
      locationName={locationName}
      sidebarCollapsed={false}
    />
  );
}