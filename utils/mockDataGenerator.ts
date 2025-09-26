import { Project, Meeting } from '@/components/HamletDashboard/mockData';

// Project title templates for variety
const projectTemplates = [
  { type: 'City Council', templates: [
    '{city} Downtown Revitalization Project',
    'Affordable Housing Initiative - {city}',
    '{city} Public Safety Enhancement Program',
    'Community Center Renovation - {city}',
    '{city} Infrastructure Improvement Plan',
    'Economic Development Zone - {city}',
    '{city} Green Energy Initiative',
    'Historic District Preservation - {city}'
  ]},
  { type: 'Planning Commission', templates: [
    'Mixed-Use Development at {city} Center',
    '{city} Transit-Oriented Development',
    'Residential Complex - North {city}',
    '{city} Commercial Plaza Expansion',
    'Waterfront Development Project - {city}',
    '{city} Business Park Master Plan',
    'Urban Renewal Project - {city}',
    'Smart Growth Initiative - {city}'
  ]},
  { type: 'Zoning Board', templates: [
    'Rezoning Request - {city} Heights',
    'Variance Application - Downtown {city}',
    'Special Use Permit - {city} Industrial',
    'Conditional Use - {city} Commercial',
    'Density Bonus Application - {city}',
    'Setback Variance - {city} Residential',
    'Height Exception Request - {city}',
    'Land Use Amendment - {city}'
  ]}
];

// Meeting types and formats
const meetingFormats = [
  'Regular Meeting',
  'Special Session',
  'Workshop',
  'Public Hearing',
  'Study Session',
  'Emergency Meeting'
];

// Status options with weighted probability
const projectStatuses: Array<{ status: Project['status'], weight: number }> = [
  { status: 'pending', weight: 40 },
  { status: 'under-review', weight: 30 },
  { status: 'approved', weight: 20 },
  { status: 'denied', weight: 10 }
];

// Address templates
const addressTemplates = [
  '{number} Main Street',
  '{number} {city} Boulevard',
  '{number} Commerce Drive',
  '{number} Park Avenue',
  '{number} Industrial Parkway',
  '{number} Civic Center Plaza',
  '{number} {state} Highway {highway}',
  '{number} Downtown Plaza'
];

// Generate a random date within range
function generateDate(daysFromNow: { min: number, max: number }): string {
  const date = new Date();
  const daysToAdd = Math.floor(Math.random() * (daysFromNow.max - daysFromNow.min + 1)) + daysFromNow.min;
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
}

// Get random item from array
function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Get weighted random status
function getRandomStatus(): Project['status'] {
  const total = projectStatuses.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * total;

  for (const item of projectStatuses) {
    random -= item.weight;
    if (random <= 0) {
      return item.status;
    }
  }

  return 'pending';
}

// Generate random address
function generateAddress(city: string, state: string): string {
  const template = randomItem(addressTemplates);
  const number = Math.floor(Math.random() * 9000) + 100;
  const highway = Math.floor(Math.random() * 99) + 1;

  return template
    .replace('{number}', number.toString())
    .replace('{city}', city)
    .replace('{state}', state)
    .replace('{highway}', highway.toString());
}

// Generate projects for a location
export function generateProjectsForLocation(
  locationId: string,
  locationName: string,
  state: string,
  count: number = 6
): Project[] {
  const projects: Project[] = [];
  const usedTitles = new Set<string>();

  for (let i = 0; i < count; i++) {
    const typeGroup = randomItem(projectTemplates);
    let title: string;

    // Ensure unique titles
    do {
      const template = randomItem(typeGroup.templates);
      title = template.replace('{city}', locationName);
    } while (usedTitles.has(title));

    usedTitles.add(title);

    projects.push({
      id: `${locationId}-p${i + 1}`,
      type: typeGroup.type as Project['type'],
      title,
      date: generateDate({ min: -30, max: 60 }),
      locationId,
      locationName: `${locationName}, ${state}`,
      address: Math.random() > 0.3 ? generateAddress(locationName, state) : undefined,
      status: getRandomStatus()
    });
  }

  // Sort by date
  return projects.sort((a, b) => a.date.localeCompare(b.date));
}

// Generate meetings for a location
export function generateMeetingsForLocation(
  locationId: string,
  locationName: string,
  state: string,
  count: number = 8
): Meeting[] {
  const meetings: Meeting[] = [];
  const bodies = ['City Council', 'Planning Commission', 'Zoning Board', 'Parks & Recreation', 'Public Works'];

  // Generate upcoming meetings
  for (let i = 0; i < count * 0.6; i++) {
    const body = randomItem(bodies);
    const format = randomItem(meetingFormats);
    const daysFromNow = Math.floor(Math.random() * 30) + 1;
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);

    meetings.push({
      id: `${locationId}-m${i + 1}`,
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      time: randomItem(['9:00AM', '2:00PM', '4:00PM', '6:00PM', '7:00PM']),
      title: `${locationName} ${body} - ${format}`,
      location: `${locationName}, ${state}`,
      locationId,
      type: 'upcoming',
      hasMatches: Math.random() > 0.6
    });
  }

  // Generate past meetings
  for (let i = Math.floor(count * 0.6); i < count; i++) {
    const body = randomItem(bodies);
    const format = randomItem(meetingFormats);
    const daysAgo = Math.floor(Math.random() * 30) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    meetings.push({
      id: `${locationId}-m${i + 1}`,
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' }),
      time: randomItem(['9:00AM', '2:00PM', '4:00PM', '6:00PM', '7:00PM']),
      title: `${locationName} ${body} - ${format}`,
      location: `${locationName}, ${state}`,
      locationId,
      type: 'past',
      hasMatches: Math.random() > 0.7
    });
  }

  return meetings;
}

// Generate agendas for a location
export function generateAgendasForLocation(
  locationId: string,
  locationName: string,
  count: number = 8
) {
  const bodies = [
    'City Council',
    'Planning Commission',
    'Zoning Board of Adjustment',
    'Parks & Recreation Committee',
    'Public Works Committee',
    'Finance Committee',
    'Transportation Board',
    'Environmental Commission'
  ];

  const formats = [
    'Regular Meeting',
    'Special Session',
    'Workshop',
    'Public Hearing',
    'Budget Review',
    'Annual Planning'
  ];

  const agendas = [];

  for (let i = 0; i < count; i++) {
    const body = bodies[i % bodies.length];
    const format = randomItem(formats);
    const daysFromNow = Math.floor(Math.random() * 60) - 30;
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);

    agendas.push({
      id: `${locationId}-a${i + 1}`,
      title: `${locationName} ${body} - ${format} Agenda`,
      date: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      pages: Math.floor(Math.random() * 40) + 8,
      hasAttachments: Math.random() > 0.3
    });
  }

  // Sort by date
  return agendas.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}