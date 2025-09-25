'use client';

import React, { useMemo, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { components, OptionProps, SingleValue, MultiValue } from 'react-select';

interface GoverningBody {
  value: string;
  label: string;
  state: string;
  city: string;
  type: 'city' | 'county' | 'state' | 'township' | 'village' | 'borough';
}

// Sample data - in production this would come from an API or database
// This represents a small sample of the 90k+ governing bodies
const GOVERNING_BODIES: GoverningBody[] = [
  // Alabama
  { value: 'albemarle-nc', label: 'Albemarle, NC', city: 'Albemarle', state: 'NC', type: 'city' },
  { value: 'alexandria-va', label: 'Alexandria, VA', city: 'Alexandria', state: 'VA', type: 'city' },
  { value: 'allen-tx', label: 'Allen, TX', city: 'Allen', state: 'TX', type: 'city' },
  { value: 'arlington-wa', label: 'Arlington, WA', city: 'Arlington', state: 'WA', type: 'city' },
  { value: 'atlanta-ga', label: 'Atlanta, GA', city: 'Atlanta', state: 'GA', type: 'city' },
  { value: 'aurora-co', label: 'Aurora, CO', city: 'Aurora', state: 'CO', type: 'city' },
  { value: 'azusa-ca', label: 'Azusa, CA', city: 'Azusa', state: 'CA', type: 'city' },
  { value: 'bellevue-wa', label: 'Bellevue, WA', city: 'Bellevue', state: 'WA', type: 'city' },
  { value: 'bellingham-wa', label: 'Bellingham, WA', city: 'Bellingham', state: 'WA', type: 'city' },
  { value: 'belmont-nc', label: 'Belmont, NC', city: 'Belmont', state: 'NC', type: 'city' },
  { value: 'brea-ca', label: 'Brea, CA', city: 'Brea', state: 'CA', type: 'city' },

  // Major cities
  { value: 'new-york-ny', label: 'New York, NY', city: 'New York', state: 'NY', type: 'city' },
  { value: 'los-angeles-ca', label: 'Los Angeles, CA', city: 'Los Angeles', state: 'CA', type: 'city' },
  { value: 'chicago-il', label: 'Chicago, IL', city: 'Chicago', state: 'IL', type: 'city' },
  { value: 'houston-tx', label: 'Houston, TX', city: 'Houston', state: 'TX', type: 'city' },
  { value: 'phoenix-az', label: 'Phoenix, AZ', city: 'Phoenix', state: 'AZ', type: 'city' },
  { value: 'philadelphia-pa', label: 'Philadelphia, PA', city: 'Philadelphia', state: 'PA', type: 'city' },
  { value: 'san-antonio-tx', label: 'San Antonio, TX', city: 'San Antonio', state: 'TX', type: 'city' },
  { value: 'san-diego-ca', label: 'San Diego, CA', city: 'San Diego', state: 'CA', type: 'city' },
  { value: 'dallas-tx', label: 'Dallas, TX', city: 'Dallas', state: 'TX', type: 'city' },
  { value: 'san-jose-ca', label: 'San Jose, CA', city: 'San Jose', state: 'CA', type: 'city' },
  { value: 'austin-tx', label: 'Austin, TX', city: 'Austin', state: 'TX', type: 'city' },
  { value: 'jacksonville-fl', label: 'Jacksonville, FL', city: 'Jacksonville', state: 'FL', type: 'city' },
  { value: 'fort-worth-tx', label: 'Fort Worth, TX', city: 'Fort Worth', state: 'TX', type: 'city' },
  { value: 'columbus-oh', label: 'Columbus, OH', city: 'Columbus', state: 'OH', type: 'city' },
  { value: 'charlotte-nc', label: 'Charlotte, NC', city: 'Charlotte', state: 'NC', type: 'city' },
  { value: 'san-francisco-ca', label: 'San Francisco, CA', city: 'San Francisco', state: 'CA', type: 'city' },
  { value: 'indianapolis-in', label: 'Indianapolis, IN', city: 'Indianapolis', state: 'IN', type: 'city' },
  { value: 'seattle-wa', label: 'Seattle, WA', city: 'Seattle', state: 'WA', type: 'city' },
  { value: 'denver-co', label: 'Denver, CO', city: 'Denver', state: 'CO', type: 'city' },
  { value: 'washington-dc', label: 'Washington, DC', city: 'Washington', state: 'DC', type: 'city' },

  // Counties
  { value: 'alameda-county-ca', label: 'Alameda County, CA', city: 'Alameda County', state: 'CA', type: 'county' },
  { value: 'cook-county-il', label: 'Cook County, IL', city: 'Cook County', state: 'IL', type: 'county' },
  { value: 'harris-county-tx', label: 'Harris County, TX', city: 'Harris County', state: 'TX', type: 'county' },
  { value: 'maricopa-county-az', label: 'Maricopa County, AZ', city: 'Maricopa County', state: 'AZ', type: 'county' },
  { value: 'san-diego-county-ca', label: 'San Diego County, CA', city: 'San Diego County', state: 'CA', type: 'county' },
  { value: 'orange-county-ca', label: 'Orange County, CA', city: 'Orange County', state: 'CA', type: 'county' },
  { value: 'miami-dade-county-fl', label: 'Miami-Dade County, FL', city: 'Miami-Dade County', state: 'FL', type: 'county' },
  { value: 'kings-county-ny', label: 'Kings County, NY', city: 'Kings County', state: 'NY', type: 'county' },
  { value: 'dallas-county-tx', label: 'Dallas County, TX', city: 'Dallas County', state: 'TX', type: 'county' },
  { value: 'riverside-county-ca', label: 'Riverside County, CA', city: 'Riverside County', state: 'CA', type: 'county' },

  // More cities to simulate larger dataset
  { value: 'portland-or', label: 'Portland, OR', city: 'Portland', state: 'OR', type: 'city' },
  { value: 'oklahoma-city-ok', label: 'Oklahoma City, OK', city: 'Oklahoma City', state: 'OK', type: 'city' },
  { value: 'las-vegas-nv', label: 'Las Vegas, NV', city: 'Las Vegas', state: 'NV', type: 'city' },
  { value: 'louisville-ky', label: 'Louisville, KY', city: 'Louisville', state: 'KY', type: 'city' },
  { value: 'baltimore-md', label: 'Baltimore, MD', city: 'Baltimore', state: 'MD', type: 'city' },
  { value: 'milwaukee-wi', label: 'Milwaukee, WI', city: 'Milwaukee', state: 'WI', type: 'city' },
  { value: 'albuquerque-nm', label: 'Albuquerque, NM', city: 'Albuquerque', state: 'NM', type: 'city' },
  { value: 'tucson-az', label: 'Tucson, AZ', city: 'Tucson', state: 'AZ', type: 'city' },
  { value: 'fresno-ca', label: 'Fresno, CA', city: 'Fresno', state: 'CA', type: 'city' },
  { value: 'sacramento-ca', label: 'Sacramento, CA', city: 'Sacramento', state: 'CA', type: 'city' },
  { value: 'mesa-az', label: 'Mesa, AZ', city: 'Mesa', state: 'AZ', type: 'city' },
  { value: 'kansas-city-mo', label: 'Kansas City, MO', city: 'Kansas City', state: 'MO', type: 'city' },
  { value: 'atlanta-ga', label: 'Atlanta, GA', city: 'Atlanta', state: 'GA', type: 'city' },
  { value: 'long-beach-ca', label: 'Long Beach, CA', city: 'Long Beach', state: 'CA', type: 'city' },
  { value: 'colorado-springs-co', label: 'Colorado Springs, CO', city: 'Colorado Springs', state: 'CO', type: 'city' },
  { value: 'raleigh-nc', label: 'Raleigh, NC', city: 'Raleigh', state: 'NC', type: 'city' },
  { value: 'miami-fl', label: 'Miami, FL', city: 'Miami', state: 'FL', type: 'city' },
  { value: 'tampa-fl', label: 'Tampa, FL', city: 'Tampa', state: 'FL', type: 'city' },
  { value: 'orlando-fl', label: 'Orlando, FL', city: 'Orlando', state: 'FL', type: 'city' },
  { value: 'st-petersburg-fl', label: 'St. Petersburg, FL', city: 'St. Petersburg', state: 'FL', type: 'city' },
  { value: 'virginia-beach-va', label: 'Virginia Beach, VA', city: 'Virginia Beach', state: 'VA', type: 'city' },
  { value: 'omaha-ne', label: 'Omaha, NE', city: 'Omaha', state: 'NE', type: 'city' },
  { value: 'oakland-ca', label: 'Oakland, CA', city: 'Oakland', state: 'CA', type: 'city' },
  { value: 'minneapolis-mn', label: 'Minneapolis, MN', city: 'Minneapolis', state: 'MN', type: 'city' },
  { value: 'tulsa-ok', label: 'Tulsa, OK', city: 'Tulsa', state: 'OK', type: 'city' },
  { value: 'arlington-tx', label: 'Arlington, TX', city: 'Arlington', state: 'TX', type: 'city' },
  { value: 'new-orleans-la', label: 'New Orleans, LA', city: 'New Orleans', state: 'LA', type: 'city' },
  { value: 'wichita-ks', label: 'Wichita, KS', city: 'Wichita', state: 'KS', type: 'city' },
];

// Generate more sample data to simulate 90k entries
// In production, this would be fetched from an API
function generateLargeDataset(): GoverningBody[] {
  const dataset = [...GOVERNING_BODIES];
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

  // Add simulated entries for demonstration
  // In production, actual data would be loaded
  for (let i = 0; i < 100; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const cityName = `City ${i + 1}`;
    dataset.push({
      value: `city-${i}-${state.toLowerCase()}`,
      label: `${cityName}, ${state}`,
      city: cityName,
      state: state,
      type: 'city'
    });
  }

  return dataset.sort((a, b) => a.label.localeCompare(b.label));
}

// Custom MenuList component with optimized scrolling
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuList = (props: any) => {
  const { children, maxHeight } = props;

  return (
    <div style={{ maxHeight, overflowY: 'auto' }}>
      {children}
    </div>
  );
};

// Custom Option component with hover effects and checkbox for multi-select
const Option = (props: OptionProps<GoverningBody>) => {
  const isMulti = props.isMulti;
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMulti && (
            <input
              type="checkbox"
              checked={props.isSelected}
              onChange={() => {}}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
          )}
          <span>{props.data.label}</span>
        </div>
        <span className="text-sm text-gray-500 ml-2">
          {props.data.type === 'county' ? 'County' : props.data.type === 'state' ? 'State' : 'City'}
        </span>
      </div>
    </components.Option>
  );
};

interface SearchableDropdownProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  isMulti?: boolean;
}

export default function SearchableDropdown({
  value,
  onChange,
  placeholder = "Type to search cities, counties, or states...",
  required = false,
  disabled = false,
  label,
  isMulti = false
}: SearchableDropdownProps) {
  const [isLoading] = useState(false);

  // Generate large dataset
  const governingBodies = useMemo(() => generateLargeDataset(), []);

  // Check if current value is a custom entry or from the list
  const selectedOption = isMulti
    ? (Array.isArray(value)
        ? value.map(v => governingBodies.find(gb => gb.label === v) ||
            { value: v.toLowerCase().replace(/\s+/g, '-'), label: v, city: v, state: '', type: 'city' as const })
        : [])
    : (typeof value === 'string'
        ? (governingBodies.find(gb => gb.label === value) ||
            (value ? { value: 'custom', label: value, city: value, state: '', type: 'city' as const } : null))
        : null);

  const handleChange = (newValue: SingleValue<GoverningBody> | MultiValue<GoverningBody>) => {
    if (isMulti && Array.isArray(newValue)) {
      onChange(newValue.map(v => v.label));
    } else if (!isMulti && !Array.isArray(newValue)) {
      const singleValue = newValue as SingleValue<GoverningBody>;
      onChange(singleValue ? singleValue.label : '');
    }
  };

  // Custom filter function for better search performance
  const customFilter = (option: { label: string; value: string; data: GoverningBody }, inputValue: string) => {
    if (!inputValue) return true;
    if (!option || !option.data) return false;

    const searchValue = inputValue.toLowerCase();
    const optionLabel = (option.label || '').toLowerCase();
    const optionCity = (option.data.city || '').toLowerCase();
    const optionState = (option.data.state || '').toLowerCase();

    // Check if search matches label, city, or state
    return optionLabel.includes(searchValue) ||
           optionCity.includes(searchValue) ||
           optionState.includes(searchValue);
  };

  return (
    <div>
      {label && (
        <label className="block text-base font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <CreatableSelect
        instanceId="city-select"
        value={selectedOption}
        onChange={handleChange}
        options={governingBodies}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        isMulti={isMulti}
        menuIsOpen={undefined}
        openMenuOnClick={true}
        openMenuOnFocus={false}
        components={{
          MenuList,
          Option
        }}
        filterOption={customFilter}
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
        onCreateOption={(inputValue) => {
          const newOption = {
            value: inputValue.toLowerCase().replace(/\s+/g, '-'),
            label: inputValue,
            city: inputValue,
            state: '',
            type: 'city' as const
          };
          if (isMulti) {
            const currentValues = Array.isArray(value) ? value : [];
            onChange([...currentValues, newOption.label]);
          } else {
            onChange(newOption.label);
          }
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: isMulti ? '56px' : '42px',
            maxHeight: isMulti ? '120px' : 'auto',
            overflowY: isMulti ? 'auto' : 'visible',
            borderRadius: '8px',
            borderColor: state.isFocused ? '#006FEE' : '#d4d4d8',
            borderWidth: '2px',
            boxShadow: 'none',
            backgroundColor: '#FFFFFF',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: '#006FEE'
            }
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#006FEE'
              : state.isFocused
                ? '#e6f1ff'
                : '#FFFFFF',
            color: state.isSelected ? '#FFFFFF' : '#11181C',
            cursor: 'pointer',
            padding: '10px 12px',
            fontSize: '16px',
            transition: 'background-color 0.1s',
            '&:active': {
              backgroundColor: state.isSelected ? '#005bc4' : '#cce3ff'
            }
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '8px',
            marginTop: '4px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e4e4e7',
            backgroundColor: '#FFFFFF',
            zIndex: 50
          }),
          menuList: (base) => ({
            ...base,
            padding: 0
          }),
          placeholder: (base) => ({
            ...base,
            color: '#71717a',
            fontSize: '16px'
          }),
          input: (base) => ({
            ...base,
            color: '#11181C',
            margin: 0,
            padding: 0,
            fontSize: '16px'
          }),
          singleValue: (base) => ({
            ...base,
            color: '#11181C',
            fontSize: '16px'
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: '#e6f1ff',
            borderRadius: '4px'
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: '#11181C',
            fontSize: '14px',
            padding: '2px 6px'
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: '#71717a',
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#cce3ff',
              color: '#ef4444'
            }
          }),
          valueContainer: (base) => ({
            ...base,
            maxHeight: isMulti ? '100px' : 'auto',
            overflowY: isMulti ? 'auto' : 'visible',
            flexWrap: isMulti ? 'wrap' : 'nowrap',
            padding: '2px 8px'
          }),
          clearIndicator: (base) => ({
            ...base,
            color: '#71717a',
            padding: '8px',
            cursor: 'pointer',
            transition: 'color 0.2s',
            '&:hover': {
              color: '#ef4444'
            }
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#71717a',
            padding: '8px',
            transition: 'color 0.2s',
            '&:hover': {
              color: '#52525b'
            }
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: '#e4e4e7'
          })
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#006FEE',
            primary25: '#e6f1ff',
            primary50: '#cce3ff',
            primary75: '#99c7ff'
          }
        })}
      />

      <p className="mt-1 text-sm text-gray-500">
        {isMulti
          ? 'Search and select multiple locations or type to add new ones'
          : 'Search for a location or type to add a new one'}
      </p>
    </div>
  );
}