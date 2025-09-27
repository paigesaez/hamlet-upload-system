'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, Building, FileText, ChevronRight, Download, Share2, Users } from 'lucide-react';
import Link from 'next/link';
import StandardLayout from '@/components/HamletDashboard/StandardLayout';
import PageHeader from '@/components/HamletDashboard/PageHeader';
import { getLocationInfo, extractLocationIdFromId } from '@/utils/locationHelpers';

interface ProjectDocument {
  name: string;
  type: string;
  size: string;
}

interface ProjectStakeholder {
  name: string;
  role: string;
  org: string;
}

interface ProjectTimeline {
  date: string;
  event: string;
  upcoming?: boolean;
}

interface Project {
  title: string;
  type: string;
  status: string;
  date: string;
  location: string;
  address: string;
  description: string;
  details: Record<string, string>;
  timeline: ProjectTimeline[];
  documents: ProjectDocument[];
  stakeholders: ProjectStakeholder[];
}

const mockProjectData: Record<string, Project> = {
  '1': {
    title: 'River Grove Mobile Home Park at 8440 U.S. Highway 1',
    type: 'City Council',
    status: 'In Review',
    date: '2025-09-04',
    location: 'Brevard County, Florida',
    address: '8440 U.S. Highway 1',
    description: 'Proposal for the development of a new mobile home park community featuring 150 units with modern amenities. The project includes community facilities, recreational areas, and sustainable infrastructure improvements.',
    details: {
      'Lot Size': '25 acres',
      'Units': '150 mobile home lots',
      'Zoning': 'Residential Mobile Home (RMH)',
      'Developer': 'River Grove Development LLC',
      'Estimated Cost': '$4.5 million'
    },
    timeline: [
      { date: '2025-07-15', event: 'Initial Application Submitted' },
      { date: '2025-08-01', event: 'Planning Department Review' },
      { date: '2025-08-20', event: 'Public Comment Period Opens' },
      { date: '2025-09-04', event: 'City Council Hearing', upcoming: true },
      { date: '2025-09-18', event: 'Final Decision Expected', upcoming: true }
    ],
    documents: [
      { name: 'Site_Plan.pdf', type: 'PDF', size: '3.2 MB' },
      { name: 'Environmental_Impact_Study.pdf', type: 'PDF', size: '5.8 MB' },
      { name: 'Traffic_Analysis.xlsx', type: 'Excel', size: '450 KB' },
      { name: 'Public_Comments.docx', type: 'Word', size: '234 KB' }
    ],
    stakeholders: [
      { name: 'John Smith', role: 'Project Manager', org: 'River Grove Development' },
      { name: 'Sarah Johnson', role: 'City Planner', org: 'Brevard County' },
      { name: 'Michael Chen', role: 'Environmental Consultant', org: 'EcoAssess Inc.' }
    ]
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;

  // Get project data (in production, this would be an API call)
  const project: Project = mockProjectData[projectId] || mockProjectData['1'];

  // Extract location information from projectId
  const locationId = extractLocationIdFromId(projectId);
  const locationInfo = getLocationInfo(locationId);
  const locationName = locationInfo?.name || locationId.charAt(0).toUpperCase() + locationId.slice(1);
  const locationFullName = locationInfo?.fullName || locationName;

  const breadcrumbs = (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link href="/hamlet-dashboard" className="hover:text-gray-900">
        Dashboard
      </Link>
      <ChevronRight size={16} className="text-gray-400" />
      <Link
        href={`/hamlet-dashboard/location/${locationId}?tab=projects`}
        className="hover:text-gray-900"
      >
        {locationFullName} Projects
      </Link>
      <ChevronRight size={16} className="text-gray-400" />
      <span className="text-gray-900 font-medium">Project Detail</span>
    </nav>
  );

  const actions = (
    <button
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: project.title,
            text: `Project: ${project.title}`,
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
      }}
      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Share project"
    >
      <Share2 size={20} />
    </button>
  );

  const subtitleParts = [project.location];
  if (project.address) subtitleParts.push(project.address);
  subtitleParts.push(`Hearing ${project.date}`);
  const subtitle = subtitleParts.join(' • ');

  return (
    <StandardLayout>
      <PageHeader
        title={project.title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        actions={actions}
        showSearch
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                {project.type}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                {project.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>Hearing: {project.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              {project.address && (
                <div className="flex items-center gap-1.5">
                  <Building size={16} />
                  <span>{project.address}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.details).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm text-gray-500">{key}</p>
                    <p className="font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Timeline</h2>
              <div className="space-y-3">
                {project.timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-3 rounded-lg ${
                      item.upcoming ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <span className="text-sm font-medium text-gray-500 w-24">{item.date}</span>
                    <span className={`flex-1 ${item.upcoming ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h2>
              <div className="space-y-3">
                {project.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group cursor-pointer">
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
            {/* Stakeholders */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={20} />
                Key Stakeholders
              </h2>
              <div className="space-y-3">
                {project.stakeholders.map((person, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.role} • {person.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Public Comment
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  View Full Application
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Subscribe to Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
