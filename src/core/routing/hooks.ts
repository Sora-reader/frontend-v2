/** Get active route's base route from the mapping */
import { useRouter } from 'next/router';
import { evalRoute, routes } from './routes';
import { useMemo } from 'react';

export const useActiveRoute = () => {
  const router = useRouter();

  return useMemo(() => {
    let match;
    Object.entries(routes)
      .map((r) => evalRoute(r))
      .forEach(([key]) => {
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
