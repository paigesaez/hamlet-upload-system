'use client';

import { Select, SelectItem, DatePicker } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import { useState } from 'react';

export default function TestPage() {
  const [selectedValue, setSelectedValue] = useState('');
  const [dateValue, setDateValue] = useState(null);

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold">HeroUI Component Test</h1>

      <div>
        <Select
          label="Test Select"
          variant="bordered"
          placeholder="Select an option"
          selectedKeys={selectedValue ? [selectedValue] : []}
          onSelectionChange={(keys) => setSelectedValue(Array.from(keys)[0] as string)}
        >
          <SelectItem key="option1" value="option1">Option 1</SelectItem>
          <SelectItem key="option2" value="option2">Option 2</SelectItem>
          <SelectItem key="option3" value="option3">Option 3</SelectItem>
        </Select>
        <p className="mt-2 text-sm text-gray-600">Selected: {selectedValue || 'none'}</p>
      </div>

      <div>
        <DatePicker
          label="Test Date"
          variant="bordered"
          value={dateValue}
          onChange={setDateValue}
        />
        <p className="mt-2 text-sm text-gray-600">
          Selected: {dateValue ? `${dateValue.year}-${dateValue.month}-${dateValue.day}` : 'none'}
        </p>
      </div>

      <div className="p-4 bg-gray-100 rounded">
        <p className="text-sm">Component Status:</p>
        <ul className="text-xs mt-2 space-y-1">
          <li>✓ Theme properly loaded with content backgrounds</li>
          <li>✓ Select should have white background</li>
          <li>✓ DatePicker should show input field, not inline calendar</li>
          <li>✓ No flickering on interaction</li>
        </ul>
      </div>
    </div>
  );
}