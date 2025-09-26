'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PrototypeNavigation from './PrototypeNavigation';

export default function ConditionalNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const showNavigation = !pathname.startsWith('/hamlet-dashboard') && !pathname.startsWith('/search');

  if (!showNavigation) {
    return null;
  }

  return <PrototypeNavigation />;
}