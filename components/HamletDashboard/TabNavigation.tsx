'use client';

import React from 'react';

export type TabType = 'projects' | 'meetings' | 'agendas';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'meetings', label: 'Meetings' },
    { id: 'agendas', label: 'Agendas' }
  ];

  return (
    <div className="bg-white px-8">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 transition-colors font-medium text-sm ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}