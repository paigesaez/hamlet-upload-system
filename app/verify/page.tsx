'use client';

import { Select, SelectItem, DatePicker } from '@heroui/react';

export default function VerifyPage() {

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">Component Verification</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test 1: Basic Select (flat variant)</h2>
        <Select
          label="Select with flat variant"
          variant="flat"
          placeholder="Choose an option"
          className="max-w-xs"
        >
          <SelectItem key="option1">Option 1</SelectItem>
          <SelectItem key="option2">Option 2</SelectItem>
          <SelectItem key="option3">Option 3</SelectItem>
        </Select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test 2: Basic Select (bordered variant)</h2>
        <Select
          label="Select with bordered variant"
          variant="bordered"
          placeholder="Choose an option"
          className="max-w-xs"
        >
          <SelectItem key="option1">Option 1</SelectItem>
          <SelectItem key="option2">Option 2</SelectItem>
          <SelectItem key="option3">Option 3</SelectItem>
        </Select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test 3: DatePicker (default)</h2>
        <DatePicker
          label="Birth date"
          className="max-w-xs"
          variant="bordered"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test 4: DatePicker with granularity</h2>
        <DatePicker
          label="Meeting date"
          className="max-w-xs"
          variant="bordered"
          granularity="day"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test 5: Minimal implementation</h2>
        <form className="space-y-4">
          <Select label="City" variant="bordered" placeholder="Select city">
            <SelectItem key="ny">New York, NY</SelectItem>
            <SelectItem key="la">Los Angeles, CA</SelectItem>
          </Select>

          <DatePicker label="Date" variant="bordered" />

          <Select label="Type" variant="bordered" placeholder="Select type">
            <SelectItem key="regular">Regular Meeting</SelectItem>
            <SelectItem key="special">Special Meeting</SelectItem>
          </Select>
        </form>
      </div>
    </div>
  );
}