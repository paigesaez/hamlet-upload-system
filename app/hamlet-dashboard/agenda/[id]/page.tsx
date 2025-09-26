'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Clock, MapPin, ChevronRight, Download, Share2, FileText, Tag } from 'lucide-react';
import Link from 'next/link';
import StandardLayout from '@/components/HamletDashboard/StandardLayout';
import { getLocationInfo, extractLocationIdFromId } from '@/utils/locationHelpers';

interface AgendaItem {
  time: string;
  title: string;
  description: string;
  presenter?: string;
  duration?: string;
  attachments?: { name: string; size: string }[];
}

interface AgendaDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  items: AgendaItem[];
  matches?: { label: string; count: number }[];
  relatedDocuments: { name: string; type: string; size: string }[];
}

// Generate mock agenda details based on the agenda ID
const generateAgendaDetails = (agendaId: string, locationName: string): AgendaDetails => {

  return {
    id: agendaId,
    title: `${locationName} City Council Regular Meeting`,
    date: 'February 15, 2025',
    time: '3:00 PM - 6:00 PM PST',
    location: `${locationName} City Hall, Council Chambers`,
    type: 'Regular Meeting',
    description: `Regular meeting of the ${locationName} City Council to discuss city business, hear public comments, and vote on agenda items.`,
    matches: [
      { label: 'Energy', count: 2 },
      { label: 'Data Center', count: 1 }
    ],
    items: [
      {
        time: '3:00 PM',
        title: 'Call to Order & Roll Call',
        description: 'Mayor will call the meeting to order and City Clerk will conduct roll call.',
        presenter: 'Mayor Johnson',
        duration: '5 min'
      },
      {
        time: '3:05 PM',
        title: 'Pledge of Allegiance',
        description: 'Led by Council Member Martinez.',
        presenter: 'Council Member Martinez',
        duration: '2 min'
      },
      {
        time: '3:07 PM',
        title: 'Public Comment Period',
        description: 'Members of the public may address the Council on any item not on the agenda. Each speaker is limited to 3 minutes.',
        duration: '30 min'
      },
      {
        time: '3:37 PM',
        title: 'Consent Calendar',
        description: 'Routine items requiring Council approval. Items may be removed for separate discussion.',
        duration: '10 min',
        attachments: [
          { name: 'Consent_Items.pdf', size: '245 KB' },
          { name: 'Financial_Reports.xlsx', size: '1.2 MB' }
        ]
      },
      {
        time: '3:47 PM',
        title: 'Energy Efficiency Initiative Update',
        description: 'Presentation on city-wide energy efficiency programs and data center sustainability measures.',
        presenter: 'Environmental Services Director',
        duration: '45 min',
        attachments: [
          { name: 'Energy_Report_Q4.pdf', size: '3.4 MB' },
          { name: 'DataCenter_Analysis.pdf', size: '2.1 MB' }
        ]
      },
      {
        time: '4:32 PM',
        title: 'Zoning Amendment - Data Center Development',
        description: 'Consider amendments to zoning ordinance regarding data center developments in industrial zones.',
        presenter: 'Planning Director',
        duration: '60 min',
        attachments: [
          { name: 'Zoning_Amendment_Draft.pdf', size: '856 KB' },
          { name: 'Impact_Study.pdf', size: '4.2 MB' }
        ]
      },
      {
        time: '5:32 PM',
        title: 'City Manager Report',
        description: 'Updates on ongoing city projects and initiatives.',
        presenter: 'City Manager',
        duration: '15 min'
      },
      {
        time: '5:47 PM',
        title: 'Council Member Reports',
        description: 'Brief reports from Council Members on committee meetings and regional activities.',
        duration: '10 min'
      },
      {
        time: '5:57 PM',
        title: 'Adjournment',
        description: 'Motion to adjourn the meeting.',
        duration: '3 min'
      }
    ],
    relatedDocuments: [
      { name: 'Full_Agenda_Packet.pdf', type: 'PDF', size: '12.4 MB' },
      { name: 'Meeting_Minutes_Previous.pdf', type: 'PDF', size: '1.8 MB' },
      { name: 'Public_Comments_Received.pdf', type: 'PDF', size: '456 KB' }
    ]
  };
};

export default function AgendaDetailPage() {
  const params = useParams();
  const agendaId = params.id as string;

  // Extract location information from agendaId
  const locationId = extractLocationIdFromId(agendaId);
  const locationInfo = getLocationInfo(locationId);
  const locationName = locationInfo?.name || locationId.charAt(0).toUpperCase() + locationId.slice(1);
  const locationFullName = locationInfo?.fullName || locationName;

  // Generate agenda details
  const agendaDetails = generateAgendaDetails(agendaId, locationName);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: agendaDetails.title,
        text: `Meeting agenda for ${agendaDetails.title} on ${agendaDetails.date}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDocumentClick = (documentName: string) => {
    // In a real app, this would download or open the document
    console.log(`Downloading ${documentName}`);
  };

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
              <Link href={`/hamlet-dashboard/location/${locationId}?tab=agendas`} className="text-gray-600 hover:text-gray-900">
                {locationFullName} Agendas
              </Link>
              <ChevronRight size={16} className="text-gray-400" />
              <span className="text-gray-900 font-medium">Agenda Detail</span>
            </nav>
            <button
              onClick={handleShareClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-3">
              {agendaDetails.type}
            </span>
            <h1 className="text-3xl font-bold text-gray-900">{agendaDetails.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{agendaDetails.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                <span>{agendaDetails.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{agendaDetails.location}</span>
              </div>
            </div>

            {/* Matches/Tags */}
            {agendaDetails.matches && agendaDetails.matches.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                <Tag size={16} className="text-gray-500" />
                <div className="flex gap-2">
                  {agendaDetails.matches.map((match, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{
                        backgroundColor: index === 0 ? '#FED7AA' : '#CCFBF1',
                        color: index === 0 ? '#9A3412' : '#065F46'
                      }}
                    >
                      {match.label} ({match.count})
                    </span>
                  ))}
                </div>
              </div>
            )}
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
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Meeting Overview</h2>
              <p className="text-gray-600 leading-relaxed">{agendaDetails.description}</p>
            </div>

            {/* Agenda Items */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda Items</h2>
              <div className="space-y-4">
                {agendaDetails.items.map((agendaItem, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-gray-200 hover:border-blue-500 pl-4 py-3 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium text-gray-500">{agendaItem.time}</span>
                          {agendaItem.duration && (
                            <span className="text-xs text-gray-400">({agendaItem.duration})</span>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{agendaItem.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{agendaItem.description}</p>
                        {agendaItem.presenter && (
                          <p className="text-xs text-gray-500">Presenter: {agendaItem.presenter}</p>
                        )}
                        {agendaItem.attachments && agendaItem.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {agendaItem.attachments.map((attachment, attachmentIndex) => (
                              <button
                                key={attachmentIndex}
                                onClick={() => handleDocumentClick(attachment.name)}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                              >
                                <FileText size={12} />
                                <span>{attachment.name}</span>
                                <span className="text-gray-500">({attachment.size})</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Documents */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h2>
              <div className="space-y-3">
                {agendaDetails.relatedDocuments.map((doc, index) => (
                  <div
                    key={index}
                    onClick={() => handleDocumentClick(doc.name)}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer"
                  >
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

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleDocumentClick('Full_Agenda_Packet.pdf')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download Full Agenda
                </button>
                <button
                  onClick={() => console.log('Join virtual meeting')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Join Virtual Meeting
                </button>
                <button
                  onClick={() => console.log('Submit public comment')}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Submit Public Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}