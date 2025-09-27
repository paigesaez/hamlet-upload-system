'use client';

import React from 'react';
import GlobalSearch from './GlobalSearch';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  showSearch?: boolean;
}

export default function PageHeader({ title, subtitle, breadcrumbs, actions, showSearch = true }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {breadcrumbs && (
          <div className="mb-4">
            {breadcrumbs}
          </div>
        )}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-base text-gray-600">{subtitle}</p>
            )}
          </div>
          {(showSearch || actions) && (
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
              {actions && (
                <div className="flex items-center gap-2 sm:gap-3 justify-end">
                  {actions}
                </div>
              )}
              {showSearch && <GlobalSearch />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
