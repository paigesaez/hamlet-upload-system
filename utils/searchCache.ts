import locationsData from '@/data/mock-data/locations.json';
import agendasData from '@/data/mock-data/agendas.json';
import meetingsData from '@/data/mock-data/meetings.json';
import projectsData from '@/data/mock-data/projects.json';
import {
  Location,
  Meeting,
  Project,
} from '@/components/HamletDashboard/mockData';

const locations = locationsData as Location[];

export interface AgendaMatch {
  label: string;
  snippet?: string;
}

export interface AgendaRecord {
  id: string;
  title?: string;
  date?: string;
  time?: string;
  pages?: number;
  hasAttachments?: boolean;
  matches?: AgendaMatch[];
  locationId: string;
  locationName: string;
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

const meetingsByLocation = meetingsData as Record<string, Meeting[]>;
const projectsByLocation = projectsData as Record<string, Project[]>;
const agendas: AgendaRecord[] = agendasData as AgendaRecord[];

const locationMap = new Map<string, { name: string; state: string }>();
locations.forEach((state) => {
  if (state.type === 'state' && state.children) {
    state.children.forEach((city) => {
      locationMap.set(city.id, { name: city.name, state: city.state });
    });
  }
});

function resolveLocationName(locationId: string, fallback?: string) {
  const match = locationMap.get(locationId);
  if (match) {
    return `${match.name}, ${match.state}`;
  }
  return fallback || locationId;
}

export function getAllSearchResults(): SearchResult[] {
  const results: SearchResult[] = [];

  Object.entries(meetingsByLocation).forEach(([locationId, meetings]) => {
    const locationName = resolveLocationName(locationId, meetings[0]?.location);

    meetings.forEach((meeting) => {
      results.push({
        id: meeting.id,
        title: meeting.title,
        type: 'meeting',
        location: locationName,
        locationId,
        date: meeting.date,
        time: meeting.time,
        excerpt: `${meeting.type === 'upcoming' ? 'Upcoming' : 'Past'} meeting scheduled for ${meeting.date} at ${meeting.time}. Click to view full meeting details, agenda, participants, and related documents.`,
        relevance: meeting.type === 'upcoming' ? 95 : 70,
        status: meeting.type,
        category: meeting.type === 'upcoming' ? 'Upcoming Meeting' : 'Past Meeting',
      });
    });
  });

  Object.entries(projectsByLocation).forEach(([locationId, projects]) => {
    const locationName = resolveLocationName(locationId, projects[0]?.locationName);

    projects.forEach((project) => {
      results.push({
        id: project.id,
        title: project.title,
        type: 'project',
        location: locationName,
        locationId,
        date: project.date,
        address: project.address,
        excerpt: `${project.type} project ${project.status ? `(${project.status})` : ''}. ${project.address ? `Located at ${project.address}.` : ''} Review project details, timeline, stakeholders, and documents.`,
        relevance: project.status === 'approved' ? 92 : 85,
        status: project.status,
        category: project.type,
      });
    });
  });

  agendas.forEach((agenda) => {
    const locationName = resolveLocationName(agenda.locationId, agenda.locationName);

    results.push({
      id: agenda.id,
      title: agenda.title || `${locationName} Meeting Agenda`,
      type: 'agenda',
      location: locationName,
      locationId: agenda.locationId,
      date: agenda.date,
      time: agenda.time,
      excerpt: `Meeting agenda for ${agenda.date || 'upcoming meeting'}. ${agenda.matches && agenda.matches.length > 0 ? `Matches found for: ${agenda.matches.map((match) => match.label).join(', ')}.` : 'Review agenda items and prepare for the meeting.'}`,
      relevance: 80,
      category: 'Agenda',
    });
  });

  return results;
}
