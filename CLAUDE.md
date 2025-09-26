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

## CRITICAL REMINDER FOR CLAUDE

### COMPONENT REUSABILITY - ALWAYS CHECK FIRST:
- **Before creating ANY new component**: Search for existing components that do the same thing
- **Reuse global components**: PageHeader, GlobalSearch, TabNavigation, etc.
- **Don't duplicate designs**: Use existing components for consistent UI
- Example: PageHeader is used across Dashboard, HomePage, and Search pages - DON'T recreate it

### SEARCH FUNCTIONALITY - DO NOT CONFUSE THESE:
1. **GLOBAL SEARCH** = Top navigation bar, searches CONTENT across all locations, opens new tab
2. **LOCATION FILTER** = Sidebar search box, filters location tree only, no navigation

These are COMPLETELY DIFFERENT features. Stop confusing them.

### ALWAYS CHECK YOUR WORK:
1. After making changes → Check site still loads (curl status check)
2. After "completing" a feature → Actually test it works
3. Before saying "done" → Verify with: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/hamlet-dashboard`
4. If you see errors → Check logs IMMEDIATELY, don't assume it's fine
5. Every significant change → Test it works, no exceptions

The user caught me not doing this basic verification when the site crashed and I didn't notice. This is fundamental - CHECK YOUR WORK.

## Last Updated
September 25, 2025 - Dashboard complete with all features, error boundary added, health monitoring implemented
**Lesson learned**: Always verify the site is actually working after changes