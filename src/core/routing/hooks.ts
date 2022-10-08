/** Get active route's base route from the mapping */
import { useRouter } from 'next/router';
import { routes } from './routes';
import { useMemo } from 'react';

export const useActiveRoute = () => {
  const router = useRouter();

  return useMemo(() => {
    let match;
    Object.keys(routes).forEach((route) => {
      if (router.asPath.startsWith(route)) {
        match = route;
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
