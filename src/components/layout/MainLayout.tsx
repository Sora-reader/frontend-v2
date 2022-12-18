import { Container, Theme } from '@mui/joy';
import { useMemo } from 'react';
import { navbarSize } from './Navbar/const';
import { navbarWrapBreakpointKey } from './Navbar/utils';
import { NotificationContainer } from '../../core/notificationSystem/components/NotificationContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { useRouter } from 'next/router';
import { isClient } from '../../misc/utils';

const navbarPaddingSx = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    paddingX: 1,
  },
  [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
    paddingBottom: `${navbarSize + 1}rem`,
  },
  [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
    paddingLeft: `${navbarSize + 1}rem`,
  },
});

const mainContainerSx = [navbarPaddingSx];

const baseReaderSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // Override padding so the image is not affected by navbar size padding
  padding: '0 !important',
};

const routeCustomSx = {
  '/read': (pagerType) => {
    switch (pagerType) {
      case 'default':
        return {
          ...baseReaderSx,
          height: (isClient() && `${window.innerHeight}px`) || '100vh',
          margin: 0,
        };
      default:
        return baseReaderSx;
    }
  },
  '/': () => ({
    my: 1,
  }),
};

export const MainLayout = ({ children }) => {
  const router = useRouter();

  const customSxEntries = useMemo(
    () => Object.entries(routeCustomSx).find(([route]) => router.asPath.includes(route)),
    [router.asPath]
  );

  const pagerType = useSelector<RootState>((state) => state.pager);
  const sx = useMemo(() => {
    if (customSxEntries) return [...mainContainerSx, customSxEntries[1](pagerType)];
    return mainContainerSx;
  }, [customSxEntries]);

  return (
    <>
      <Container sx={sx}>{children}</Container>
      <NotificationContainer />
    </>
  );
};
