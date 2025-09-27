'use client';

import React from 'react';
interface StandardLayoutProps {
  children: React.ReactNode;
}

export default function StandardLayout({ children }: StandardLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
