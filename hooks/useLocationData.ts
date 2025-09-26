'use client';

import { useMemo } from 'react';
import { Meeting, Project, findLocationById } from '@/components/HamletDashboard/mockData';
import meetingsData from '@/data/mock-data/meetings.json';
import projectsData from '@/data/mock-data/projects.json';
import agendasData from '@/data/mock-data/agendas.json';

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

const meetingsByLocation = meetingsData as Record<string, Meeting[]>;
const projectsByLocation = projectsData as Record<string, Project[]>;
const agendas: AgendaRecord[] = agendasData as AgendaRecord[];

export function useLocationData(locationId: string) {
  const meetings = useMemo<Meeting[]>(() => {
    if (!locationId) return [];
    return meetingsByLocation[locationId] || [];
  }, [locationId]);

  const projects = useMemo<Project[]>(() => {
    if (!locationId) return [];
    return projectsByLocation[locationId] || [];
  }, [locationId]);

  const agendasForLocation = useMemo<AgendaRecord[]>(() => {
    if (!locationId) return [];
    return agendas.filter((agenda) => agenda.locationId === locationId);
  }, [locationId]);

  const locationInfo = useMemo(() => findLocationById(locationId), [locationId]);

  return {
    projects,
    meetings,
    agendas: agendasForLocation,
    loading: false,
    locationInfo,
  };
}
