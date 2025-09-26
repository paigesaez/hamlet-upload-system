'use client';

import React from 'react';
import GlobalSearch from './GlobalSearch';

interface StandardLayoutProps {
  children: React.ReactNode;
  showGlobalSearch?: boolean;
}

export default function StandardLayout({ children, showGlobalSearch = true }: StandardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Navigation Header */}
      {showGlobalSearch && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-end">
              <GlobalSearch />
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      {children}
    </div>
  );
}