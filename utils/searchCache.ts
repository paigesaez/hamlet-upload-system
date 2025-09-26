import { locations, Meeting, Project } from '@/components/HamletDashboard/mockData';

export interface AgendaMatch {
  label: string;
  snippet?: string;
}

export interface CachedAgenda {
  id: string;
  title?: string;
  date?: string;
  time?: string;
  pages?: number;
  hasAttachments?: boolean;
  matches?: AgendaMatch[];
}

export interface CachedLocationData {
  meetings?: Meeting[];
  projects?: Project[];
  agendas?: CachedAgenda[];
  generatedAt?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'meeting' | 'project' | 'agenda';
  location: string;
  locationId: string;
  date?: string;
  time?: string;
  excerpt: string;
  relevance: number;
  status?: string;
  address?: string;
  category?: string;
}

const CACHE_KEY = 'hamlet-location-data-cache';

export function getAllCachedSearchResults(): SearchResult[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const cacheString = window.localStorage.getItem(CACHE_KEY);
  if (!cacheString) {
    return [];
  }

  const results: SearchResult[] = [];

  try {
    const cacheData: Record<string, CachedLocationData> = JSON.parse(cacheString);

    Object.entries(cacheData).forEach(([locationId, data]) => {
      const locationInfo = locations
        .flatMap(state => state.children || [])
        .find(city => city.id === locationId);

      if (!locationInfo) return;

      const locationName = `${locationInfo.name}, ${locationInfo.state}`;

      if (Array.isArray(data.meetings)) {
        data.meetings.forEach(meeting => {
          results.push({
            id: meeting.id,
            title: meeting.title,
            type: 'meeting',
            location: locationName,
            locationId,
            date: meeting.date,
            time: meeting.time,
            excerpt: `${meeting.type === 'upcoming' ? 'Upcoming' : 'Past'} meeting scheduled for ${meeting.date} at ${meeting.time}. Click to view full meeting details, agenda, participants, and related documents.`,
            relevance: 90,
            status: meeting.type,
            category: meeting.type === 'upcoming' ? 'Upcoming Meeting' : 'Past Meeting'
          });
        });
      }

      if (Array.isArray(data.projects)) {
        data.projects.forEach(project => {
          results.push({
            id: project.id,
            title: project.title,
            type: 'project',
            location: locationName,
            locationId,
            date: project.date,
            address: project.address,
            excerpt: `${project.type} project ${project.status ? `(${project.status})` : ''}. ${project.address ? `Located at ${project.address}.` : ''} Review project details, timeline, stakeholders, and documents.`,
            relevance: 85,
            status: project.status,
            category: project.type
          });
        });
      }

      if (Array.isArray(data.agendas)) {
        data.agendas.forEach(agenda => {
          results.push({
            id: agenda.id,
            title: agenda.title || `${locationInfo.name} Meeting Agenda`,
            type: 'agenda',
            location: locationName,
            locationId,
            date: agenda.date,
            time: agenda.time,
            excerpt: `Meeting agenda for ${agenda.date || 'upcoming meeting'}. ${agenda.matches && agenda.matches.length > 0 ? `Matches found for: ${agenda.matches.map(match => match.label).join(', ')}.` : 'Review agenda items and prepare for the meeting.'}`,
            relevance: 80,
            category: 'Agenda'
          });
        });
      }
    });
  } catch (error) {
    console.error('Error parsing cache data:', error);
  }

  return results;
}
