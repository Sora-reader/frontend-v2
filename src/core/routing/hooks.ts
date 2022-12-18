import { useRouter } from 'next/router';
import { routes } from './routes';
import { useMemo } from 'react';

// Returns href
export const useActiveRoute = () => {
  const router = useRouter();

  return useMemo(() => {
    let match;
    Object.entries(routes).forEach(([key]) => {
      if (router.asPath.startsWith(key)) {
        match = key;
      }
    });
    return match;
  }, [router.asPath]);
};

/** Hook to determine if current route is a reader view */
export const useIsReaderRoute = (): boolean => {
  const router = useRouter();

  return router.pathname.includes('/read/');
};
