'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    };

    // Call immediately
    scrollToTop();

    // Call again after a short delay to ensure Next.js routing doesn't override it
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, lenis]);

  return null;
}
