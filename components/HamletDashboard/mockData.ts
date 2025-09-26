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
  type: 'City Council' | 'Planning Commission' | 'Zoning Board';
  title: string;
  date: string;
  locationId: string;
  locationName: string;
  address?: string;
  status?: 'pending' | 'approved' | 'denied' | 'under-review';
}

export const locations: Location[] = [
  {
    id: 'az',
    name: 'Arizona',
    state: 'AZ',
    type: 'state',
    children: [
      { id: 'phoenix', name: 'Phoenix', state: 'AZ', type: 'city' },
      { id: 'tucson', name: 'Tucson', state: 'AZ', type: 'city' },
      { id: 'mesa', name: 'Mesa', state: 'AZ', type: 'city' },
      { id: 'chandler', name: 'Chandler', state: 'AZ', type: 'city' },
      { id: 'scottsdale', name: 'Scottsdale', state: 'AZ', type: 'city', isLocked: true },
      { id: 'glendale-az', name: 'Glendale', state: 'AZ', type: 'city' },
      { id: 'gilbert', name: 'Gilbert', state: 'AZ', type: 'city' },
      { id: 'tempe', name: 'Tempe', state: 'AZ', type: 'city' },
      { id: 'peoria-az', name: 'Peoria', state: 'AZ', type: 'city' },
      { id: 'surprise', name: 'Surprise', state: 'AZ', type: 'city' },
      { id: 'yuma', name: 'Yuma', state: 'AZ', type: 'city' },
      { id: 'avondale', name: 'Avondale', state: 'AZ', type: 'city' },
      { id: 'goodyear', name: 'Goodyear', state: 'AZ', type: 'city' },
      { id: 'flagstaff', name: 'Flagstaff', state: 'AZ', type: 'city' },
      { id: 'buckeye', name: 'Buckeye', state: 'AZ', type: 'city' },
      { id: 'casa-grande', name: 'Casa Grande', state: 'AZ', type: 'city' },
      { id: 'lake-havasu', name: 'Lake Havasu City', state: 'AZ', type: 'city' },
      { id: 'florence', name: 'Florence', state: 'AZ', type: 'city' },
      { id: 'maricopa', name: 'Maricopa', state: 'AZ', type: 'city' },
      { id: 'oro-valley', name: 'Oro Valley', state: 'AZ', type: 'city' },
    ]
  },
  {
    id: 'ca',
    name: 'California',
    state: 'CA',
    type: 'state',
    children: [
      { id: 'los-angeles', name: 'Los Angeles', state: 'CA', type: 'city' },
      { id: 'san-diego', name: 'San Diego', state: 'CA', type: 'city', isLocked: true },
      { id: 'san-jose', name: 'San Jose', state: 'CA', type: 'city' },
      { id: 'san-francisco', name: 'San Francisco', state: 'CA', type: 'city', isLocked: true },
      { id: 'fresno', name: 'Fresno', state: 'CA', type: 'city' },
      { id: 'sacramento', name: 'Sacramento', state: 'CA', type: 'city' },
      { id: 'long-beach', name: 'Long Beach', state: 'CA', type: 'city' },
      { id: 'oakland', name: 'Oakland', state: 'CA', type: 'city' },
      { id: 'bakersfield', name: 'Bakersfield', state: 'CA', type: 'city' },
      { id: 'anaheim', name: 'Anaheim', state: 'CA', type: 'city' },
      { id: 'santa-ana', name: 'Santa Ana', state: 'CA', type: 'city' },
      { id: 'riverside', name: 'Riverside', state: 'CA', type: 'city' },
      { id: 'stockton', name: 'Stockton', state: 'CA', type: 'city' },
      { id: 'irvine', name: 'Irvine', state: 'CA', type: 'city' },
      { id: 'chula-vista', name: 'Chula Vista', state: 'CA', type: 'city' },
      { id: 'fremont', name: 'Fremont', state: 'CA', type: 'city' },
      { id: 'san-bernardino', name: 'San Bernardino', state: 'CA', type: 'city' },
      { id: 'modesto', name: 'Modesto', state: 'CA', type: 'city' },
      { id: 'fontana', name: 'Fontana', state: 'CA', type: 'city' },
      { id: 'oxnard', name: 'Oxnard', state: 'CA', type: 'city' },
      { id: 'moreno-valley', name: 'Moreno Valley', state: 'CA', type: 'city' },
      { id: 'glendale-ca', name: 'Glendale', state: 'CA', type: 'city' },
      { id: 'huntington-beach', name: 'Huntington Beach', state: 'CA', type: 'city' },
      { id: 'santa-clarita', name: 'Santa Clarita', state: 'CA', type: 'city' },
      { id: 'garden-grove', name: 'Garden Grove', state: 'CA', type: 'city' },
      { id: 'santa-rosa', name: 'Santa Rosa', state: 'CA', type: 'city' },
      { id: 'oceanside', name: 'Oceanside', state: 'CA', type: 'city' },
      { id: 'rancho-cucamonga', name: 'Rancho Cucamonga', state: 'CA', type: 'city' },
      { id: 'ontario', name: 'Ontario', state: 'CA', type: 'city' },
      { id: 'lancaster', name: 'Lancaster', state: 'CA', type: 'city' },
      { id: 'elk-grove', name: 'Elk Grove', state: 'CA', type: 'city' },
      { id: 'palmdale', name: 'Palmdale', state: 'CA', type: 'city' },
      { id: 'corona', name: 'Corona', state: 'CA', type: 'city' },
      { id: 'salinas', name: 'Salinas', state: 'CA', type: 'city' },
      { id: 'pomona', name: 'Pomona', state: 'CA', type: 'city' },
      { id: 'torrance', name: 'Torrance', state: 'CA', type: 'city' },
      { id: 'hayward', name: 'Hayward', state: 'CA', type: 'city' },
      { id: 'escondido', name: 'Escondido', state: 'CA', type: 'city' },
      { id: 'sunnyvale', name: 'Sunnyvale', state: 'CA', type: 'city' },
      { id: 'pasadena', name: 'Pasadena', state: 'CA', type: 'city' },
      { id: 'fullerton', name: 'Fullerton', state: 'CA', type: 'city' },
      { id: 'orange', name: 'Orange', state: 'CA', type: 'city' },
      { id: 'thousand-oaks', name: 'Thousand Oaks', state: 'CA', type: 'city' },
      { id: 'visalia', name: 'Visalia', state: 'CA', type: 'city' },
      { id: 'simi-valley', name: 'Simi Valley', state: 'CA', type: 'city' },
      { id: 'concord', name: 'Concord', state: 'CA', type: 'city' },
      { id: 'roseville', name: 'Roseville', state: 'CA', type: 'city' },
      { id: 'vallejo', name: 'Vallejo', state: 'CA', type: 'city' },
      { id: 'fairfield', name: 'Fairfield', state: 'CA', type: 'city' },
      { id: 'murrieta', name: 'Murrieta', state: 'CA', type: 'city' },
      { id: 'bellaire', name: 'Bellaire', state: 'CA', type: 'city' },
      { id: 'brea', name: 'Brea', state: 'CA', type: 'city' },
      { id: 'buena-park', name: 'Buena Park', state: 'CA', type: 'city' },
      { id: 'calabasas', name: 'Calabasas', state: 'CA', type: 'city' },
      { id: 'calimesa', name: 'Calimesa', state: 'CA', type: 'city' },
      { id: 'claremont', name: 'Claremont', state: 'CA', type: 'city' },
    ]
  },
  {
    id: 'ut',
    name: 'Utah',
    state: 'UT',
    type: 'state',
    children: [
      { id: 'salt-lake-city', name: 'Salt Lake City', state: 'UT', type: 'city', isLocked: true },
      { id: 'west-valley', name: 'West Valley City', state: 'UT', type: 'city' },
      { id: 'west-jordan', name: 'West Jordan', state: 'UT', type: 'city' },
      { id: 'provo', name: 'Provo', state: 'UT', type: 'city' },
      { id: 'orem', name: 'Orem', state: 'UT', type: 'city' },
      { id: 'sandy', name: 'Sandy', state: 'UT', type: 'city' },
      { id: 'st-george', name: 'St. George', state: 'UT', type: 'city' },
      { id: 'ogden', name: 'Ogden', state: 'UT', type: 'city' },
      { id: 'layton', name: 'Layton', state: 'UT', type: 'city' },
      { id: 'south-jordan', name: 'South Jordan', state: 'UT', type: 'city' },
      { id: 'lehi', name: 'Lehi', state: 'UT', type: 'city' },
      { id: 'millcreek', name: 'Millcreek', state: 'UT', type: 'city' },
      { id: 'taylorsville', name: 'Taylorsville', state: 'UT', type: 'city' },
      { id: 'logan', name: 'Logan', state: 'UT', type: 'city' },
      { id: 'murray', name: 'Murray', state: 'UT', type: 'city' },
      { id: 'draper', name: 'Draper', state: 'UT', type: 'city' },
      { id: 'bountiful', name: 'Bountiful', state: 'UT', type: 'city' },
      { id: 'riverton', name: 'Riverton', state: 'UT', type: 'city' },
      { id: 'spanish-fork', name: 'Spanish Fork', state: 'UT', type: 'city' },
      { id: 'pleasant-grove', name: 'Pleasant Grove', state: 'UT', type: 'city' },
      { id: 'cottonwood-heights', name: 'Cottonwood Heights', state: 'UT', type: 'city' },
      { id: 'tooele', name: 'Tooele', state: 'UT', type: 'city' },
      { id: 'springville', name: 'Springville', state: 'UT', type: 'city' },
      { id: 'cedar-city', name: 'Cedar City', state: 'UT', type: 'city' },
      { id: 'midvale', name: 'Midvale', state: 'UT', type: 'city' },
      { id: 'eagle-mountain', name: 'Eagle Mountain', state: 'UT', type: 'city' },
      { id: 'saratoga-springs', name: 'Saratoga Springs', state: 'UT', type: 'city' },
      { id: 'herriman', name: 'Herriman', state: 'UT', type: 'city' },
      { id: 'clearfield', name: 'Clearfield', state: 'UT', type: 'city' },
      { id: 'washington', name: 'Washington', state: 'UT', type: 'city' },
    ]
  },
  {
    id: 'tx',
    name: 'Texas',
    state: 'TX',
    type: 'state',
    children: [
      { id: 'houston', name: 'Houston', state: 'TX', type: 'city' },
      { id: 'san-antonio', name: 'San Antonio', state: 'TX', type: 'city' },
      { id: 'dallas', name: 'Dallas', state: 'TX', type: 'city', isLocked: true },
      { id: 'austin', name: 'Austin', state: 'TX', type: 'city', isLocked: true },
      { id: 'fort-worth', name: 'Fort Worth', state: 'TX', type: 'city' },
      { id: 'el-paso', name: 'El Paso', state: 'TX', type: 'city' },
      { id: 'arlington', name: 'Arlington', state: 'TX', type: 'city' },
      { id: 'corpus-christi', name: 'Corpus Christi', state: 'TX', type: 'city' },
      { id: 'plano', name: 'Plano', state: 'TX', type: 'city' },
      { id: 'lubbock', name: 'Lubbock', state: 'TX', type: 'city' },
      { id: 'laredo', name: 'Laredo', state: 'TX', type: 'city' },
      { id: 'irving', name: 'Irving', state: 'TX', type: 'city' },
      { id: 'garland', name: 'Garland', state: 'TX', type: 'city' },
      { id: 'frisco', name: 'Frisco', state: 'TX', type: 'city' },
      { id: 'mckinney', name: 'McKinney', state: 'TX', type: 'city' },
      { id: 'amarillo', name: 'Amarillo', state: 'TX', type: 'city' },
      { id: 'grand-prairie', name: 'Grand Prairie', state: 'TX', type: 'city' },
      { id: 'brownsville', name: 'Brownsville', state: 'TX', type: 'city' },
      { id: 'pasadena-tx', name: 'Pasadena', state: 'TX', type: 'city' },
      { id: 'mesquite', name: 'Mesquite', state: 'TX', type: 'city' },
      { id: 'killeen', name: 'Killeen', state: 'TX', type: 'city' },
      { id: 'mcallen', name: 'McAllen', state: 'TX', type: 'city' },
      { id: 'waco', name: 'Waco', state: 'TX', type: 'city' },
      { id: 'carrollton', name: 'Carrollton', state: 'TX', type: 'city' },
      { id: 'denton', name: 'Denton', state: 'TX', type: 'city' },
      { id: 'midland', name: 'Midland', state: 'TX', type: 'city' },
      { id: 'abilene', name: 'Abilene', state: 'TX', type: 'city' },
      { id: 'beaumont', name: 'Beaumont', state: 'TX', type: 'city' },
      { id: 'round-rock', name: 'Round Rock', state: 'TX', type: 'city' },
      { id: 'richardson', name: 'Richardson', state: 'TX', type: 'city' },
      { id: 'wichita-falls', name: 'Wichita Falls', state: 'TX', type: 'city' },
      { id: 'odessa', name: 'Odessa', state: 'TX', type: 'city' },
      { id: 'college-station', name: 'College Station', state: 'TX', type: 'city' },
      { id: 'pearland', name: 'Pearland', state: 'TX', type: 'city' },
      { id: 'league-city', name: 'League City', state: 'TX', type: 'city' },
      { id: 'tyler', name: 'Tyler', state: 'TX', type: 'city' },
      { id: 'allen', name: 'Allen', state: 'TX', type: 'city' },
      { id: 'sugar-land', name: 'Sugar Land', state: 'TX', type: 'city' },
      { id: 'edinburg', name: 'Edinburg', state: 'TX', type: 'city' },
      { id: 'mission', name: 'Mission', state: 'TX', type: 'city' },
      { id: 'conroe', name: 'Conroe', state: 'TX', type: 'city' },
      { id: 'bryan', name: 'Bryan', state: 'TX', type: 'city' },
      { id: 'new-braunfels', name: 'New Braunfels', state: 'TX', type: 'city' },
      { id: 'baytown', name: 'Baytown', state: 'TX', type: 'city' },
      { id: 'pharr', name: 'Pharr', state: 'TX', type: 'city' },
      { id: 'temple', name: 'Temple', state: 'TX', type: 'city' },
      { id: 'missouri-city', name: 'Missouri City', state: 'TX', type: 'city' },
      { id: 'flower-mound', name: 'Flower Mound', state: 'TX', type: 'city' },
      { id: 'mansfield', name: 'Mansfield', state: 'TX', type: 'city' },
      { id: 'forney', name: 'Forney', state: 'TX', type: 'city' },
    ]
  },
];

export const meetingsByLocation: Record<string, Meeting[]> = {
  'irvine': [
    // Upcoming meetings
    {
      id: '1',
      date: 'Wed 3/1',
      time: '3:00PM',
      title: 'Irvine City Council',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'upcoming',
      hasMatches: true
    },
    {
      id: '2',
      date: 'Mon 3/9',
      time: '3:00PM',
      title: 'Irvine Planning',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'upcoming',
      hasMatches: false
    },
    {
      id: '3',
      date: 'Mon 4/13',
      time: '3:00PM',
      title: 'Meeting Title',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'upcoming',
      hasMatches: false
    },
    // Past meetings
    {
      id: '4',
      date: 'Tue 12/11',
      time: '1:00PM',
      title: 'Meeting Title',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'past',
      hasMatches: false
    },
    {
      id: '5',
      date: 'Mon 12/10',
      time: '1:00PM',
      title: 'Meeting Title',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'past',
      hasMatches: false
    },
    {
      id: '6',
      date: 'Fri 12/7',
      time: '3:00PM',
      title: 'Meeting Title',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'past',
      hasMatches: false
    },
    {
      id: '7',
      date: 'Thu 12/6',
      time: '4:00PM',
      title: 'Meeting Title',
      location: 'Irvine, CA',
      locationId: 'irvine',
      type: 'past',
      hasMatches: false
    },
  ],
  'houston': [
    {
      id: '8',
      date: 'Wed 3/15',
      time: '2:00PM',
      title: 'Houston City Council',
      location: 'Houston, TX',
      locationId: 'houston',
      type: 'upcoming',
      hasMatches: true
    },
    {
      id: '9',
      date: 'Mon 3/22',
      time: '4:00PM',
      title: 'Houston Planning Commission',
      location: 'Houston, TX',
      locationId: 'houston',
      type: 'upcoming',
      hasMatches: false
    },
  ],
  'brea': [
    {
      id: '10',
      date: 'Tue 3/5',
      time: '6:00PM',
      title: 'Brea City Council',
      location: 'Brea, CA',
      locationId: 'brea',
      type: 'upcoming',
      hasMatches: true
    },
  ]
};

// Default to empty array for locations without meetings
export const getMeetingsForLocation = (locationId: string): Meeting[] => {
  // If we have specific data, return it
  if (meetingsByLocation[locationId]) {
    return meetingsByLocation[locationId];
  }

  // Otherwise generate mock data for any location
  const location = findLocationById(locationId);
  if (!location) return [];

  return [
    {
      id: `${locationId}-m1`,
      date: 'Mon 2/3',
      time: '6:00PM',
      title: `${location.name} City Council`,
      location: `${location.name}, ${location.state}`,
      locationId: locationId,
      type: 'upcoming',
      hasMatches: true
    },
    {
      id: `${locationId}-m2`,
      date: 'Wed 2/5',
      time: '7:00PM',
      title: `${location.name} Planning Commission`,
      location: `${location.name}, ${location.state}`,
      locationId: locationId,
      type: 'upcoming',
      hasMatches: false
    },
    {
      id: `${locationId}-m3`,
      date: 'Fri 1/24',
      time: '5:00PM',
      title: `${location.name} Zoning Board`,
      location: `${location.name}, ${location.state}`,
      locationId: locationId,
      type: 'past',
      hasMatches: false
    }
  ];
};

// Mock projects data by location
const projectsByLocation: Record<string, Project[]> = {
  'mesa': [
    {
      id: 'p1',
      type: 'City Council',
      title: 'Mesa Gateway Airport Development Plan',
      date: '2025-01-15',
      locationId: 'mesa',
      locationName: 'Mesa, AZ',
      address: '5835 S Sossaman Rd',
      status: 'under-review'
    },
    {
      id: 'p2',
      type: 'Planning Commission',
      title: 'Downtown Mesa Mixed-Use Development',
      date: '2025-01-20',
      locationId: 'mesa',
      locationName: 'Mesa, AZ',
      address: '120 W Main St',
      status: 'pending'
    },
    {
      id: 'p3',
      type: 'Zoning Board',
      title: 'Residential Rezoning Request - East Mesa',
      date: '2025-01-22',
      locationId: 'mesa',
      locationName: 'Mesa, AZ',
      address: '7240 E Brown Rd',
      status: 'pending'
    }
  ],
  'brea': [
    {
      id: 'p4',
      type: 'City Council',
      title: 'Brea Mall Renovation Project',
      date: '2025-01-18',
      locationId: 'brea',
      locationName: 'Brea, CA',
      address: '1065 Brea Mall',
      status: 'approved'
    },
    {
      id: 'p5',
      type: 'Planning Commission',
      title: 'Carbon Canyon Road Widening',
      date: '2025-01-25',
      locationId: 'brea',
      locationName: 'Brea, CA',
      status: 'under-review'
    }
  ],
  'houston': [
    {
      id: 'p6',
      type: 'City Council',
      title: 'Houston Medical District Expansion',
      date: '2025-01-16',
      locationId: 'houston',
      locationName: 'Houston, TX',
      address: '1515 Holcombe Blvd',
      status: 'approved'
    },
    {
      id: 'p7',
      type: 'Planning Commission',
      title: 'Buffalo Bayou Park Enhancement',
      date: '2025-01-28',
      locationId: 'houston',
      locationName: 'Houston, TX',
      status: 'pending'
    },
    {
      id: 'p8',
      type: 'Zoning Board',
      title: 'Heights Historic District Preservation',
      date: '2025-02-01',
      locationId: 'houston',
      locationName: 'Houston, TX',
      address: '1900 Yale St',
      status: 'under-review'
    }
  ]
};

// Get projects for a specific location - generate mock data for any location
export const getProjectsForLocation = (locationId: string): Project[] => {
  // If we have specific data, return it
  if (projectsByLocation[locationId]) {
    return projectsByLocation[locationId];
  }

  // Otherwise generate mock data for any location
  const location = findLocationById(locationId);
  if (!location) return [];

  return [
    {
      id: `${locationId}-p1`,
      type: 'City Council',
      title: `${location.name} Downtown Revitalization Project`,
      date: '2025-02-01',
      locationId: locationId,
      locationName: `${location.name}, ${location.state}`,
      address: '100 Main Street',
      status: 'pending'
    },
    {
      id: `${locationId}-p2`,
      type: 'Planning Commission',
      title: `New Mixed-Use Development - ${location.name} Center`,
      date: '2025-02-05',
      locationId: locationId,
      locationName: `${location.name}, ${location.state}`,
      address: '250 Commerce Blvd',
      status: 'under-review'
    },
    {
      id: `${locationId}-p3`,
      type: 'Zoning Board',
      title: `Residential Rezoning Request - North ${location.name}`,
      date: '2025-02-10',
      locationId: locationId,
      locationName: `${location.name}, ${location.state}`,
      status: 'approved'
    }
  ];
};

// Helper function to find location by ID
function findLocationById(locationId: string): Location | undefined {
  for (const state of locations) {
    if (state.id === locationId) return state;
    if (state.children) {
      const city = state.children.find(c => c.id === locationId);
      if (city) return city;
    }
  }
  return undefined;
}