'use client';

import React from 'react';
import Link from 'next/link';
import GlobalSearch from './GlobalSearch';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showBranding?: boolean;
}

export default function PageHeader({ title, subtitle, showSearch = true, showBranding = false }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1 h-16 bg-teal-500 rounded-full" />
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-base text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {showSearch && <GlobalSearch />}
        </div>
      </div>
    </div>
  );
}