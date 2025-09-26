# Claude Context File

## Project Overview
This is a multi-prototype form upload application built with Next.js 15.5.3, TypeScript, and Tailwind CSS. It includes multiple upload prototypes and a dashboard interface for the Hamlet meeting management system.

## Key URLs
- **Form Uploader**: http://localhost:3001/form-uploader
- **Hamlet Dashboard**: http://localhost:3001/hamlet-dashboard (no prototype nav)
- **Search Results**: http://localhost:3001/search (no prototype nav)
- **Health Check**: http://localhost:3001/api/health

## Technology Stack
- **Framework**: Next.js 15.5.3 with Turbopack
- **Styling**: Tailwind CSS v3, NextUI components, Open Sans font
- **State Management**: React hooks (useState, useCallback, useMemo)
- **Languages**: TypeScript, React 19.1.0

## Project Structure

### Prototypes
1. **Prototype 1**: Hamlet Batch Upload (`/`) - Form for batch video uploads with multi-select locations
2. **Prototype 2**: Hamlet Dashboard (`/prototype-2` or `/hamlet-dashboard`) - Meeting management dashboard
3. **Prototype 3**: Coming soon (`/prototype-3`)

### Key Components

#### Hamlet Dashboard Features
- **Collapsible sidebar** with location tree (states → cities)
- **Locked locations** for premium upsell (San Francisco, San Diego, Austin, Dallas, Salt Lake City, Scottsdale)
- **TWO COMPLETELY DIFFERENT SEARCH FEATURES:**
  - **GLOBAL SEARCH (Top Nav)**: Searches CONTENT across ALL locations, opens results in new tab
  - **Location Filter (Sidebar)**: Just filters the location tree for easier navigation, NO new tab
- **Meeting cards** with upcoming/past sections and "New Match" badges
- **Responsive design** with mobile hamburger menu
- **156 cities** across 4 states (California, Texas, Arizona, Utah)

#### Important Implementation Details
- Sidebar collapse button (chevron) on the right edge
- Clear button (X) in search fields
- Support and Logout links at bottom of sidebar
- Meeting clicks don't open new tabs (ready for modal implementation)
- Error boundary wraps dashboard for crash recovery

## Commands & Scripts

### Development
```bash
npm run dev        # Start dev server on port 3000
PORT=3001 npm run dev  # Start on port 3001
npm run build      # Production build with Turbopack
npm run lint       # Run ESLint
```

### IMPORTANT: Always Check After Changes
```bash
# After making changes, ALWAYS check:
curl -I http://localhost:3001/hamlet-dashboard  # Should return 200 OK
curl -I http://localhost:3001/                  # Should return 200 OK

# If you get 500 or no response, restart the server
```

### Monitoring
```bash
./scripts/monitor.sh  # Health check monitor (every 30 seconds)
curl http://localhost:3001/api/health  # Manual health check
```

## Known Issues & Recovery

### Dev Server Crashes
- **Symptom**: 500 errors, site unreachable
- **Cause**: Turbopack build errors, file system issues
- **Fix**: Kill process and restart
```bash
# Find and kill existing process
lsof -t -i:3001 | xargs kill -9
# Restart
PORT=3001 npm run dev
```

### Build Errors
- **Clear cache**: `rm -rf .next`
- **Reinstall deps**: `rm -rf node_modules && npm install`

## Design Decisions

### UI/UX
- **Font**: Open Sans (client requirement, not preferred but mandated)
- **Colors**: Navy sidebar (#1e293b), blue accents for active states
- **Spacing**: 8px grid system, consistent padding/margins

### Architecture
- **Error Handling**: ErrorBoundary component for graceful failures
- **Performance**: Memoization for expensive filters, virtual scrolling considered for large lists
- **Type Safety**: Full TypeScript coverage, interfaces for all data structures

### Testing Strategy
Currently using "lightweight" approach:
- TypeScript for compile-time type checking
- ESLint for code quality
- Build validation for runtime errors
- Manual testing for critical paths

**Note**: No unit/integration tests currently implemented. Consider adding if this becomes production-critical.

## Security Considerations
- No secrets in code
- Locked locations use client-side checks only (not secure for real premium features)
- Search opens in new tab to prevent XSS in current context

## Future Improvements
1. Add real authentication for locked locations
2. Implement actual meeting detail pages/modals
3. Add database integration (currently using mock data)
4. Set up proper error tracking (Sentry, LogRocket)
5. Add E2E tests for critical user flows
6. Implement real-time updates with WebSockets

## Contact & Support
- Health monitoring endpoint: `/api/health`
- Error logs: Browser console in development
- Manual monitoring script: `./scripts/monitor.sh`

## CRITICAL REMINDERS FOR CLAUDE

### 1. COMPONENT REUSABILITY - MANDATORY FIRST PASS:
**BEFORE writing any new code:**
```bash
# ALWAYS run these first:
Grep -pattern "similar-functionality" -type "tsx"
Glob "**/components/**/*.tsx"
Read COMPONENTS.md  # Complete component library documentation
```

**Reusable components available:**
- `FilterSelect` - Use for ALL dropdowns (consistent styling)
- `PageHeader` - Use for ALL page headers
- `GlobalSearch` - Top nav search bar
- `TabNavigation` - Tab switchers
- `ErrorBoundary` - Error handling wrapper

**Extract patterns immediately** - If you see something twice, make it a component

### 2. SEARCH FUNCTIONALITY - CURRENT IMPLEMENTATION:
1. **Global Search** (Top nav) - Searches content across all locations
2. **Location Filter** (Sidebar) - Filters location tree only
3. **Saved Searches** - Saves query + filters (type, location), immutable like Google
4. **Data Source** - Pulls from localStorage cache (hundreds of items from generated mock data)

### 3. DATA STORAGE ARCHITECTURE:
- **localStorage** for permanent mock data (`hamlet-location-data-cache`)
- Data generated once per location and cached forever
- Includes meetings, projects, agendas with realistic variety
- Search pulls from ALL cached location data

### 4. UI/UX PATTERNS:
**Filters:**
- Horizontal inline for search page (responsive)
- Vertical with labels for dashboard
- Always use `FilterSelect` component

**Buttons:**
- Primary: `bg-blue-600 hover:bg-blue-700 text-white`
- Secondary: `border border-gray-300 text-gray-700 hover:bg-gray-50`
- Text: `text-blue-600 hover:text-blue-700`

**Spacing:**
- Use multiples of 4 (p-2, p-4, p-6)
- Standard card: `bg-white rounded-lg p-6 border border-gray-200`

### 5. NAVIGATION PATTERNS:
- **Breadcrumbs** for detail pages (NOT back buttons)
- **URL params** for state (tab, filters)
- **In-page routing** for meetings/projects (not new tabs)

### 6. ALWAYS CHECK YOUR WORK:
1. After changes → `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/hamlet-dashboard`
2. Test the actual feature, not just that it compiles
3. Check logs if anything seems wrong
4. Verify with real user interaction

### 7. DEVELOPMENT APPROACH:
1. **Search first** - Check what exists before creating
2. **Reuse first** - Extend existing components
3. **Extract early** - Don't wait for third repetition
4. **Think system-wide** - Consider entire app, not just current page
5. **Document always** - Update COMPONENTS.md with new patterns

The user caught me:
- Not reusing components (creating new filters instead of using existing patterns)
- Not checking my work (site crashed and I didn't notice)
- Building page-specific solutions instead of system-wide components

This is fundamental - REUSE, CHECK, DOCUMENT.

## Last Updated
September 25, 2025 - Dashboard complete with all features, error boundary added, health monitoring implemented
**Lesson learned**: Always verify the site is actually working after changes
- always use descriptive variables
- What They Mean:

  These tags represent keyword matches or topics of 
  interest found in that agenda. The number in
  parentheses indicates how many times that topic
  appears in the agenda items.

  For example:
  - Energy (2) = The word "energy" or energy-related
  topics appear 2 times in this meeting's agenda
  - Data Center (1) = Data center topics are mentioned
  once

  This is a search/filtering feature that helps users
  quickly identify which meetings contain discussions
  about topics they care about. If someone is interested
   in energy policy or data center development, they can
   quickly spot relevant meetings by these tags.

  The different colors (orange for Energy, teal for Data
   Center) help visually distinguish between different
  topic categories at a glance.

  In a real implementation, these would likely be:
  1. Generated by scanning agenda documents for keywords
  2. Used for filtering meetings by topic
  3. Searchable to find all meetings discussing specific
   subjects
  4. Potentially customizable based on user interests

  This is similar to how modern meeting management
  systems highlight relevant topics to help stakeholders
   quickly identify meetings they need to attend or
  review.