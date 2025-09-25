'use client';

import React, { useMemo, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface GoverningBody {
  value: string;
  label: string;
  state: string;
  city: string;
  type: 'city' | 'county' | 'state' | 'township' | 'village' | 'borough';
}

// Sample data - in production this would come from an API or database
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
  { value: 'seattle-wa', label: 'Seattle, WA', city: 'Seattle', state: 'WA', type: 'city' },
  { value: 'denver-co', label: 'Denver, CO', city: 'Denver', state: 'CO', type: 'city' },
  { value: 'washington-dc', label: 'Washington, DC', city: 'Washington', state: 'DC', type: 'city' },

  // Counties
  { value: 'alameda-county-ca', label: 'Alameda County, CA', city: 'Alameda County', state: 'CA', type: 'county' },
  { value: 'cook-county-il', label: 'Cook County, IL', city: 'Cook County', state: 'IL', type: 'county' },
  { value: 'harris-county-tx', label: 'Harris County, TX', city: 'Harris County', state: 'TX', type: 'county' },
  { value: 'orange-county-ca', label: 'Orange County, CA', city: 'Orange County', state: 'CA', type: 'county' },
];

// Generate more sample data
function generateLargeDataset(): GoverningBody[] {
  const dataset = [...GOVERNING_BODIES];
  const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA'];

  // Add simulated entries for demonstration
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

interface NextUISearchableDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  allowsCustomValue?: boolean;
}

export default function NextUISearchableDropdown({
  value,
  onChange,
  placeholder = "Type to search cities, counties, or states...",
  required = false,
  disabled = false,
  label,
  allowsCustomValue = true
}: NextUISearchableDropdownProps) {
  const [inputValue, setInputValue] = useState("");

  // Generate large dataset
  const governingBodies = useMemo(() => generateLargeDataset(), []);

  // Filter items based on input
  const filteredItems = useMemo(() => {
    if (!inputValue) return governingBodies;

    const searchValue = inputValue.toLowerCase();
    return governingBodies.filter(item =>
      item.label.toLowerCase().includes(searchValue) ||
      item.city.toLowerCase().includes(searchValue) ||
      item.state.toLowerCase().includes(searchValue)
    );
  }, [inputValue, governingBodies]);

  const handleSelectionChange = (key: React.Key | null) => {
    if (key) {
      const selectedItem = governingBodies.find(item => item.value === key);
      if (selectedItem) {
        onChange(selectedItem.label);
      }
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (allowsCustomValue && value) {
      // Allow custom value if not in the list
      const exists = governingBodies.some(item =>
        item.label.toLowerCase() === value.toLowerCase()
      );
      if (!exists) {
        onChange(value);
      }
    }
  };

  return (
    <Autocomplete
      label={label}
      placeholder={placeholder}
      defaultItems={filteredItems}
      selectedKey={governingBodies.find(item => item.label === value)?.value || null}
      inputValue={inputValue}
      onSelectionChange={handleSelectionChange}
      onInputChange={handleInputChange}
      allowsCustomValue={allowsCustomValue}
      isRequired={required}
      isDisabled={disabled}
      size="lg"
      variant="bordered"
      classNames={{
        base: "max-w-full",
        listboxWrapper: "max-h-[400px]",
        popoverContent: "p-0",
      }}
      listboxProps={{
        hideSelectedIcon: false,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-base",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[pressed=true]:opacity-70",
          ],
        },
      }}
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      endContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">{filteredItems.length} options</span>
        </div>
      }
    >
      {(item) => (
        <AutocompleteItem key={item.value} textValue={item.label}>
          <div className="flex justify-between items-center">
            <span className="text-base">{item.label}</span>
            <span className="text-sm text-default-400">
              {item.type === 'county' ? 'County' : item.type === 'state' ? 'State' : 'City'}
            </span>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}