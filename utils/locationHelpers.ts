import { locations } from '@/components/HamletDashboard/mockData';

export function getLocationInfo(locationId: string): { name: string; state: string; fullName: string } | null {
  // Search through all locations to find the matching one
  for (const state of locations) {
    if (state.children) {
      const city = state.children.find(c => c.id === locationId);
      if (city) {
        return {
          name: city.name,
          state: city.state,
          fullName: `${city.name}, ${city.state}`
        };
      }
    }
  }

  // Fallback: try to extract from the ID itself
  const name = locationId.split('-')[0];
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    state: '',
    fullName: name.charAt(0).toUpperCase() + name.slice(1)
  };
}

export function extractLocationIdFromId(id: string): string {
  // Extract location ID from meeting/project/agenda ID
  // Format is typically: locationId-type-number (e.g., "mesa-m1", "los-angeles-p3")
  const parts = id.split('-');

  // Handle multi-word locations like "los-angeles"
  if (parts.length >= 3 && (parts[0] === 'los' || parts[0] === 'new' || parts[0] === 'san')) {
    return `${parts[0]}-${parts[1]}`;
  }

  return parts[0];
}