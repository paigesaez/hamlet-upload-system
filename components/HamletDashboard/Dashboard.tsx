'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, MapPin, Clock, ChevronRight, FileText } from 'lucide-react';
import { getMeetingsForLocation, Meeting, getProjectsForLocation, Project } from './mockData';
import { useLocationData } from '@/hooks/useLocationData';
import PageHeader from './PageHeader';
import TabNavigation, { TabType } from './TabNavigation';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface DashboardProps {
  selectedLocation: string;
  locationName: string;
  sidebarCollapsed?: boolean;
}


const Dashboard: React.FC<DashboardProps> = ({ selectedLocation, locationName, sidebarCollapsed = false }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize tab from URL or default to 'meetings'
  const tabFromUrl = searchParams.get('tab') as TabType;
  const [activeTab, setActiveTab] = useState<TabType>(tabFromUrl || 'meetings');

  // Update tab when URL changes
  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab && ['meetings', 'projects', 'agendas'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Get meetings for selected location
  const meetings = useMemo(() => {
    return getMeetingsForLocation(selectedLocation);
  }, [selectedLocation]);

  // Separate upcoming and past meetings
  const { upcomingMeetings, pastMeetings } = useMemo(() => {
    const upcoming = meetings.filter(m => m.type === 'upcoming');
    const past = meetings.filter(m => m.type === 'past');
    return { upcomingMeetings: upcoming, pastMeetings: past };
  }, [meetings]);

  const handleMeetingClick = useCallback((meetingId: string) => {
    // Open meeting detail page in new tab
    window.open(`/hamlet-dashboard/meeting/${meetingId}`, '_blank');
  }, []);

  const renderMeetingsContent = () => {
    if (!selectedLocation) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Select a location to view meetings</p>
        </div>
      );
    }

    if (meetings.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No meetings found for {locationName}</p>
        </div>
      );
    }

    return (
      <div className="divide-y divide-gray-200">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            onClick={() => handleMeetingClick(meeting.id)}
            className="bg-white px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {meeting.title}
                  </h3>
                  {meeting.hasMatches && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{meeting.date}</span>
                  <span>•</span>
                  <span>{meeting.time}</span>
                  <span>•</span>
                  <span>{meeting.location}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const projects = useMemo(() => {
    return getProjectsForLocation(selectedLocation);
  }, [selectedLocation]);

  const renderProjectsContent = () => {
    if (!selectedLocation) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Select a location to view projects</p>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found for {locationName}</p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => window.open(`/hamlet-dashboard/project/${project.id}`, '_blank')}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {project.title}
                  </h3>
                  {project.status === 'pending' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">
                      Pending
                    </span>
                  )}
                  {project.status === 'approved' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                      Approved
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                  {project.address && (
                    <>
                      <span>•</span>
                      <span>{project.address}</span>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAgendasContent = () => {
    if (!selectedLocation) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Select a location to view agendas</p>
        </div>
      );
    }

    // Generate agenda data matching Figma layout
    const agendas = [
      {
        id: `${selectedLocation}-a1`,
        day: 'Fri',
        date: '2/15',
        year: '2025',
        type: 'Upcoming Meeting',
        title: `${locationName.split(',')[0]} Planning Meeting`,
        time: '3:00PM',
        location: locationName,
        matches: [{ label: 'Energy', count: 2 }, { label: 'Data Center', count: 1 }]
      },
      {
        id: `${selectedLocation}-a2`,
        day: 'Tue',
        date: '2/17',
        year: '2025',
        type: 'Upcoming Meeting',
        title: `${locationName.split(',')[0]} Clean Energy`,
        time: '12:00PM',
        location: locationName,
        matches: [{ label: 'Energy', count: 2 }, { label: 'Data Center', count: 2 }]
      },
      {
        id: `${selectedLocation}-a3`,
        day: 'Wed',
        date: '3/1',
        year: '2025',
        type: 'Upcoming Meeting',
        title: `${locationName.split(',')[0]} City Council`,
        time: '3:00PM',
        location: locationName,
        matches: null
      },
      {
        id: `${selectedLocation}-a4`,
        day: 'Mon',
        date: '3/9',
        year: '2025',
        type: 'Upcoming Meeting',
        title: `${locationName.split(',')[0]} Planning`,
        time: '3:00PM',
        location: locationName,
        matches: null
      }
    ];

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Upcoming Meetings</h2>
        <div className="space-y-3">
          {agendas.map((agenda) => (
            <div
              key={agenda.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => window.open(`/hamlet-dashboard/agenda/${agenda.id}`, '_blank')}
            >
              <div className="flex items-start gap-4">
                {/* Date Box */}
                <div className="text-center flex-shrink-0 min-w-[50px]">
                  <div className="text-xs text-gray-500 font-normal">{agenda.day}</div>
                  <div className="text-2xl font-bold text-gray-900 leading-tight">{agenda.date}</div>
                  <div className="text-xs text-gray-400">{agenda.year}</div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-xs text-blue-600 font-medium uppercase tracking-wider mb-1">{agenda.type}</div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {agenda.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-3">
                    <span className="text-gray-600">{agenda.time}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{agenda.location}</span>
                  </div>

                  {/* Matches */}
                  {agenda.matches ? (
                    <div>
                      <div className="text-xs text-gray-500 mb-2">Matches</div>
                      <div className="flex gap-2 flex-wrap">
                        {agenda.matches.map((match, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                            style={{
                              backgroundColor: idx === 0 ? '#FED7AA' : '#CCFBF1',
                              color: idx === 0 ? '#9A3412' : '#065F46'
                            }}
                          >
                            {match.label} ({match.count})
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 italic">No Matches</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <PageHeader
        title={locationName || 'Select a Location'}
        subtitle={locationName ? 'Meeting activity and updates' : undefined}
      />

      {/* Tabs */}
      <div className="bg-white px-8">
        <div className="flex gap-8">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('tab', 'projects');
              router.push(`${pathname}?${params.toString()}`);
            }}
            className={`py-4 px-1 border-b-2 transition-colors font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('tab', 'meetings');
              router.push(`${pathname}?${params.toString()}`);
            }}
            className={`py-4 px-1 border-b-2 transition-colors font-medium text-sm ${
              activeTab === 'meetings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Meetings
          </button>
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set('tab', 'agendas');
              router.push(`${pathname}?${params.toString()}`);
            }}
            className={`py-4 px-1 border-b-2 transition-colors font-medium text-sm ${
              activeTab === 'agendas'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Agendas
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 py-6">
        {activeTab === 'projects' && (
          <div>
            {renderProjectsContent()}
          </div>
        )}
        {activeTab === 'meetings' && (
          <div>{renderMeetingsContent()}</div>
        )}
        {activeTab === 'agendas' && (
          <div className="bg-gray-50 rounded-lg p-6">
            {renderAgendasContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;