import { locations } from '@/components/HamletDashboard/mockData';
import { generateLocationData, CachedLocationData } from '@/hooks/useLocationData';

const CACHE_KEY = 'hamlet-location-data-cache';

export function initializeSearchCache() {
  if (typeof window === 'undefined') return;

  // Check if cache already exists
  const existingCache = localStorage.getItem(CACHE_KEY);
  if (existingCache) {
    try {
      const data = JSON.parse(existingCache);
      // If cache has data, don't regenerate
      if (Object.keys(data).length > 0) {
        return;
      }
    } catch {
      // Invalid cache, will regenerate
    }
  }

  // Generate data for all locations
  const allLocationData: Record<string, CachedLocationData> = {};

  locations.forEach(state => {
    if (state.children) {
      state.children.forEach(city => {
        const locationData = generateLocationData(city.id);
        allLocationData[city.id] = locationData;
      });
    }
  });

  // Store in localStorage
  localStorage.setItem(CACHE_KEY, JSON.stringify(allLocationData));
  console.log(`Initialized search cache with ${Object.keys(allLocationData).length} locations`);
}