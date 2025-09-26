# Reusable Components Library

## Core Philosophy
**ALWAYS check for existing components before creating new ones**

## Layout Components

### PageHeader
**Location**: `/components/HamletDashboard/PageHeader.tsx`
**Usage**: Consistent page headers across all dashboard pages
```tsx
<PageHeader
  title="Page Title"
  subtitle="Optional subtitle"
  showSearch={true}  // Global search bar
/>
```

### Sidebar
**Location**: `/components/HamletDashboard/Sidebar.tsx`
**Usage**: Navigation sidebar with locations and saved searches
```tsx
<Sidebar
  selectedLocation={locationId}
  onLocationSelect={(id, name) => {...}}
  isOpen={sidebarOpen}
  onToggle={() => setSidebarOpen(!sidebarOpen)}
  isCollapsed={collapsed}
  onCollapsedChange={setCollapsed}
/>
```

## Form Controls

### FilterSelect
**Location**: `/components/shared/FilterSelect.tsx`
**Usage**: Consistent select dropdowns for filtering
```tsx
// With label
<FilterSelect
  label="Year"
  value={selected}
  onChange={setSelected}
  options={[
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ]}
/>

// Inline (no label)
<FilterSelect
  inline={true}
  value={selected}
  onChange={setSelected}
  options={options}
/>
```
**Styling**: `px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`

### GlobalSearch
**Location**: `/components/HamletDashboard/GlobalSearch.tsx`
**Usage**: Top navigation search bar
```tsx
<GlobalSearch />
```

## Navigation

### TabNavigation
**Location**: `/components/HamletDashboard/TabNavigation.tsx`
**Usage**: Tab switcher for content sections
```tsx
<TabNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### PrototypeNavigation
**Location**: `/components/PrototypeNavigation.tsx`
**Usage**: Top bar for switching between prototypes
```tsx
<PrototypeNavigation currentPrototype={1} />
```

## Error Handling

### ErrorBoundary
**Location**: `/components/ErrorBoundary.tsx`
**Usage**: Wrap components to catch and handle errors gracefully
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## Common Styles

### Buttons
```tsx
// Primary
className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"

// Secondary
className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"

// Text button
className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
```

### Cards
```tsx
className="bg-white rounded-lg p-6 border border-gray-200"
```

### Input fields
```tsx
className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
```

## Best Practices

1. **Before creating ANY component**:
   - Search: `Glob "**/components/**/*.tsx"`
   - Check if similar component exists
   - Consider extracting shared patterns

2. **Maintain consistency**:
   - Use FilterSelect for ALL dropdowns
   - Use PageHeader for ALL page headers
   - Follow established color schemes

3. **Component reuse checklist**:
   - [ ] Did I search for existing components?
   - [ ] Can I extend an existing component?
   - [ ] Am I following the style guide?
   - [ ] Did I document the new component here?

## Color Palette

- Primary: `blue-600` / `blue-700` (hover)
- Secondary: `gray-300` / `gray-50` (hover)
- Text: `gray-900` (primary), `gray-700` (secondary), `gray-500` (muted)
- Borders: `border-gray-200` or `border-gray-300`
- Background: `bg-gray-50` (page), `bg-white` (cards)

## Spacing Convention

- Use multiples of 4 (`p-2`, `p-4`, `p-6`)
- Standard card padding: `p-6`
- Standard button padding: `px-4 py-2`
- Standard gap between elements: `gap-4`