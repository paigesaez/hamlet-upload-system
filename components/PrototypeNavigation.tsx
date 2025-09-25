'use client';

import { Tabs, Tab } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

export interface Prototype {
  key: string;
  title: string;
  path: string;
  description?: string;
}

const prototypes: Prototype[] = [
  {
    key: 'hamlet',
    title: 'Prototype 1: Hamlet',
    path: '/',
    description: 'Batch upload for meeting recordings'
  },
  {
    key: 'prototype-2',
    title: 'Prototype 2',
    path: '/prototype-2',
    description: 'Second upload workflow'
  },
  {
    key: 'prototype-3',
    title: 'Prototype 3',
    path: '/prototype-3',
    description: 'Third upload workflow'
  }
];

export default function PrototypeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Find current prototype based on pathname
  const currentKey = prototypes.find(p => p.path === pathname)?.key || 'hamlet';

  return (
    <div className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs
          selectedKey={currentKey}
          onSelectionChange={(key) => {
            const prototype = prototypes.find(p => p.key === key);
            if (prototype) {
              router.push(prototype.path);
            }
          }}
          aria-label="Prototype navigation"
          color="primary"
          variant="underlined"
          classNames={{
            base: "w-full",
            tabList: "gap-6 w-full relative rounded-none p-0 border-b-0",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary"
          }}
        >
          {prototypes.map((prototype) => (
            <Tab
              key={prototype.key}
              title={
                <div className="flex items-center space-x-2">
                  <span>{prototype.title}</span>
                  {prototype.description && (
                    <span className="hidden lg:inline text-xs text-gray-500">
                      • {prototype.description}
                    </span>
                  )}
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
}