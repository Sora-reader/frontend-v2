import {useRouter} from 'next/router';
import {useMemo} from 'react';

export const baseRoutes = {
  '/': 'Home',
  '/lists': 'Lists',
  '/search': 'Search',
};

export const extraRoutes = {
  '/profile': 'Profile',
  '/logout': 'Logout',
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};

// TODO: move this util or rename the file
export const useActiveRoute = () => {
  const router = useRouter();

  return useMemo(() => {
    let match;
    Object.entries(routes).forEach(([route]) => {
      if (router.asPath.startsWith(route)) {
        match = route;
      }
    });
    return match;
  }, [router.asPath]);
};
