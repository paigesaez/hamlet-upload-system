'use client';

import { HeroUIProvider } from '@heroui/react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <Toaster position="top-right" />
    </HeroUIProvider>
  );
}