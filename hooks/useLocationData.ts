'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project, Meeting } from '@/components/HamletDashboard/mockData';
import {
  generateProjectsForLocation,
  generateMeetingsForLocation,
  generateAgendasForLocation
} from '@/utils/mockDataGenerator';

interface LocationData {
  projects: Project[];
  meetings: Meeting[];
  agendas: unknown[];
  generatedAt: string;
}

interface LocationDataCache {
  [locationId: string]: LocationData;
}

const CACHE_KEY = 'hamlet-location-data-cache';
// No expiration - data is permanent

export function useLocationData(locationId: string, locationName: string, state: string) {
  const [data, setData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load or generate data for location
  const loadLocationData = useCallback(() => {
    if (!locationId || !locationName) {
      setLoading(false);
      return;
    }

    try {
      // Get existing cache
      const cacheString = localStorage.getItem(CACHE_KEY);
      const cache: LocationDataCache = cacheString ? JSON.parse(cacheString) : {};

      // Check if we have cached data for this location
      const cached = cache[locationId];

      if (cached) {
        // Always use cached data - it's permanent
        setData(cached);
        setLoading(false);
        return;
      }

      // Generate new data
      const newData: LocationData = {
        projects: generateProjectsForLocation(locationId, locationName, state, 8),
        meetings: generateMeetingsForLocation(locationId, locationName, state, 10),
        agendas: generateAgendasForLocation(locationId, locationName, 8),
        generatedAt: new Date().toISOString()
      };

      // Update cache
      cache[locationId] = newData;

      // Only keep data for last 100 locations to prevent localStorage from getting too large
      const locationIds = Object.keys(cache);
      if (locationIds.length > 100) {
        // Sort by generatedAt and remove oldest
        const sorted = locationIds.sort((a, b) => {
          const timeA = new Date(cache[a].generatedAt).getTime();
          const timeB = new Date(cache[b].generatedAt).getTime();
          return timeB - timeA;
        });

        // Keep only the 100 most recent
        const toKeep = sorted.slice(0, 100);
        const newCache: LocationDataCache = {};
        toKeep.forEach(id => {
          newCache[id] = cache[id];
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
      } else {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      }

      setData(newData);
    } catch (error) {
      console.error('Error loading location data:', error);
      // Generate data without caching if localStorage fails
      setData({
        projects: generateProjectsForLocation(locationId, locationName, state, 8),
        meetings: generateMeetingsForLocation(locationId, locationName, state, 10),
        agendas: generateAgendasForLocation(locationId, locationName, 8),
        generatedAt: new Date().toISOString()
      });
    }

    setLoading(false);
  }, [locationId, locationName, state]);

  useEffect(() => {
    loadLocationData();
  }, [loadLocationData]);

  // Clear cache for a specific location
  const clearLocationCache = useCallback((locId?: string) => {
    try {
      if (locId) {
        const cacheString = localStorage.getItem(CACHE_KEY);
        if (cacheString) {
          const cache: LocationDataCache = JSON.parse(cacheString);
          delete cache[locId];
          localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        }
      } else {
        // Clear all cache
        localStorage.removeItem(CACHE_KEY);
      }

      // Reload data
      loadLocationData();
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }, [loadLocationData]);

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    try {
      const cacheString = localStorage.getItem(CACHE_KEY);
      if (!cacheString) return { locations: 0, sizeKB: 0 };

      const cache: LocationDataCache = JSON.parse(cacheString);
      const sizeKB = new Blob([cacheString]).size / 1024;

      return {
        locations: Object.keys(cache).length,
        sizeKB: Math.round(sizeKB * 10) / 10
      };
    } catch {
      return { locations: 0, sizeKB: 0 };
    }
  }, []);

  return {
    projects: data?.projects || [],
    meetings: data?.meetings || [],
    agendas: data?.agendas || [],
    loading,
    clearCache: clearLocationCache,
    cacheStats: getCacheStats()
  };
}