'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, FileText, ChevronRight, Download, Share2, Edit } from 'lucide-react';
import Link from 'next/link';
import StandardLayout from '@/components/HamletDashboard/StandardLayout';

interface Participant {
  name: string;
  role: string;
  avatar?: string;
}

interface Document {
  name: string;
  type: string;
  size: string;
}

interface Meeting {
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
  participants: Participant[];
  documents: Document[];
  agenda: { time: string; item: string; }[];
}

const mockMeetingData: Record<string, Meeting> = {
  '1': {
    title: 'Q4 2024 Budget Review Meeting',
    date: 'December 15, 2024',
    time: '2:00 PM - 4:00 PM PST',
    location: 'Los Angeles City Hall, Room 340',
    status: 'upcoming',
    description: 'Quarterly budget review meeting to discuss Q4 2024 allocations, infrastructure improvements, and community programs. This meeting will cover all departmental budget requests and adjustments for the final quarter.',
    participants: [
      { name: 'Sarah Johnson', role: 'Budget Director' },
      { name: 'Michael Chen', role: 'City Controller' },
      { name: 'Jennifer Martinez', role: 'Finance Committee Chair' },
      { name: 'Robert Williams', role: 'Infrastructure Lead' },
    ],
    documents: [
      { name: 'Q4_Budget_Proposal.pdf', type: 'PDF', size: '2.4 MB' },
      { name: 'Infrastructure_Report.xlsx', type: 'Excel', size: '856 KB' },
      { name: 'Community_Programs_Review.docx', type: 'Word', size: '1.2 MB' },
    ],
    agenda: [
      { time: '2:00 PM', item: 'Opening Remarks & Attendance' },
      { time: '2:15 PM', item: 'Q3 Budget Performance Review' },
      { time: '2:45 PM', item: 'Q4 Budget Allocations Discussion' },
      { time: '3:15 PM', item: 'Infrastructure Improvements Proposal' },
      { time: '3:45 PM', item: 'Community Programs Funding' },
      { time: '3:55 PM', item: 'Closing Remarks & Next Steps' },
    ]
  }
};

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id as string;

  // Get meeting data (in production, this would be an API call)
  const meeting: Meeting = mockMeetingData[meetingId] || mockMeetingData['1'];

  // Extract location from meetingId (e.g., 'mesa-m1' -> 'mesa')
  const locationId = meetingId.split('-')[0];
  const locationName = locationId.charAt(0).toUpperCase() + locationId.slice(1);

  return (
    <StandardLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/hamlet-dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <Link href={`/hamlet-dashboard/location/${locationId}?tab=meetings`} className="text-gray-600 hover:text-gray-900">
                {locationName} Meetings
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-900 font-medium">Meeting Detail</span>
            </nav>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: meeting.title,
                      text: `Meeting: ${meeting.title} on ${meeting.date}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={() => alert('Edit functionality would be here')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit size={20} />
              </button>
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-3">
              {meeting.status === 'upcoming' ? 'Upcoming' : 'Past'} Meeting
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{meeting.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{meeting.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{meeting.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{meeting.description}</p>
            </div>

            {/* Agenda */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda</h2>
              <div className="space-y-3">
                {meeting.agenda.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm font-medium text-gray-500 w-20">{item.time}</span>
                    <span className="text-gray-700 flex-1">{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="space-y-3">
                {meeting.documents.map((doc, index) => (
                  <div key={index} onClick={() => alert(`Download ${doc.name} (${doc.size})`)} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-600">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Download size={18} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Participants */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} />
                Participants ({meeting.participants.length})
              </h2>
              <div className="space-y-3">
                {meeting.participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      <p className="text-xs text-gray-500">{participant.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => alert('Join meeting functionality would open video conference')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join Meeting
                </button>
                <button
                  onClick={() => alert('Calendar integration would be here')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Add to Calendar
                </button>
                <button
                  onClick={() => alert('Meeting minutes document would open here')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Minutes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}