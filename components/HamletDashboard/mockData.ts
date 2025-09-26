import locationsData from '@/data/mock-data/locations.json';
import meetingsData from '@/data/mock-data/meetings.json';
import projectsData from '@/data/mock-data/projects.json';

export interface Location {
  id: string;
  name: string;
  state: string;
  type: 'state' | 'city';
  isLocked?: boolean;
  children?: Location[];
}

export interface Meeting {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  locationId: string;
  type: 'upcoming' | 'past';
  hasMatches: boolean;
}

export interface Project {
  id: string;
  type: 'City Council' | 'Planning Commission' | 'Zoning Board' | string;
  title: string;
  date: string;
  locationId: string;
  locationName: string;
  address?: string;
  status?: 'pending' | 'approved' | 'denied' | 'under-review' | string;
}

export const locations = locationsData as Location[];

const meetingsByLocation = meetingsData as Record<string, Meeting[]>;
const projectsByLocation = projectsData as Record<string, Project[]>;

export const getMeetingsForLocation = (locationId: string): Meeting[] => {
  if (meetingsByLocation[locationId]) {
    return meetingsByLocation[locationId];
  }

  const location = findLocationById(locationId);
  if (!location || location.type !== 'city') return [];

  return [
    {
      id: `${locationId}-m1`,
      date: 'Mon 2/3',
      time: '6:00PM',
      title: `${location.name} City Council`,
      location: `${location.name}, ${location.state}`,
      locationId,
      type: 'upcoming',
      hasMatches: true,
    },
    {
      id: `${locationId}-m2`,
      date: 'Wed 2/5',
      time: '7:00PM',
      title: `${location.name} Planning Commission`,
      location: `${location.name}, ${location.state}`,
      locationId,
      type: 'upcoming',
      hasMatches: false,
    },
    {
      id: `${locationId}-m3`,
      date: 'Fri 1/24',
      time: '5:00PM',
      title: `${location.name} Zoning Board`,
      location: `${location.name}, ${location.state}`,
      locationId,
      type: 'past',
      hasMatches: false,
    },
  ];
};

export const getProjectsForLocation = (locationId: string): Project[] => {
  if (projectsByLocation[locationId]) {
    return projectsByLocation[locationId];
  }

  const location = findLocationById(locationId);
  if (!location || location.type !== 'city') return [];

  return [
    {
      id: `${locationId}-p1`,
      type: 'City Council',
      title: `${location.name} Downtown Revitalization Project`,
      date: '2025-02-01',
      locationId,
      locationName: `${location.name}, ${location.state}`,
      address: '100 Main Street',
      status: 'pending',
    },
    {
      id: `${locationId}-p2`,
      type: 'Planning Commission',
      title: `New Mixed-Use Development - ${location.name} Center`,
      date: '2025-02-05',
      locationId,
      locationName: `${location.name}, ${location.state}`,
      address: '250 Commerce Blvd',
      status: 'under-review',
    },
    {
      id: `${locationId}-p3`,
      type: 'Zoning Board',
      title: `Residential Rezoning Request - North ${location.name}`,
      date: '2025-02-10',
      locationId,
      locationName: `${location.name}, ${location.state}`,
      status: 'approved',
    },
  ];
};

export function findLocationById(locationId: string): Location | undefined {
  for (const state of locations) {
    if (state.id === locationId) return state;
    if (state.children) {
      const city = state.children.find((child) => child.id === locationId);
      if (city) return city;
    }
  }
  return undefined;
}
