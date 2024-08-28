'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname hook

const useRouteChanged = (fn: () => void) => {
  const pathname = usePathname(); // Get current pathname

  useEffect(() => {
    if (pathname) {
      fn(); // Call the provided function whenever the pathname changes
      console.log('App is changing to: ', pathname);
    }
  }, [pathname, fn]); // Dependency array to run effect on pathname change
};

export default useRouteChanged;
