import { Badge, Box, Container, Theme } from '@mui/joy';
import { Fragment, useCallback, useMemo } from 'react';
import { baseRoutes, evalRoute, extraRoutes, useActiveRoute, useIsReaderRoute } from '../../core/routing';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import { buttonContainerSx, Navbar } from './Navbar';
import { navbarSize } from './Navbar/const';
import { navbarWrapBreakpointKey } from './Navbar/utils';
import { NotificationContainer } from '../../core/notificationSystem/components/NotificationContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { useRouter } from 'next/router';
import { isClient } from '../../misc/utils';

const renderBaseNavbarIcons = (allowAnimation, hovered) => {
  const activeRoute = useActiveRoute();
  const iconExtraProps = {
    allowAnimation,
    hovered,
    activeRoute,
  };

  const renderIcon = ([href, { name, icon: Icon, badge }]) => {
    const Wrapper = !!badge ? Badge : Fragment;
    return (
      <Wrapper key={href}>
        <NavbarRouteIcon name={name} href={href} {...iconExtraProps}>
          <Icon sx={{ margin: '8px' }} />
        </NavbarRouteIcon>
      </Wrapper>
    );
  };

  const renderIconArray = (arr) =>
    Object.entries(arr)
      .map((r) => evalRoute(r))
      .map(renderIcon);

  return (
    <>
      <Box id="base-routes" sx={buttonContainerSx}>
        {renderIconArray(baseRoutes)}
      </Box>
      <Box id="extra-routes" sx={buttonContainerSx}>
        {renderIconArray(extraRoutes)}
      </Box>
    </>
  );
};

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
  const isReaderRoute = useIsReaderRoute();

  const customSxEntries = useMemo(
    () => Object.entries(routeCustomSx).find(([route]) => router.asPath.includes(route)),
    [router.asPath]
  );
  const render = useCallback(renderBaseNavbarIcons, []);

  const pagerType = useSelector<RootState>((state) => state.pager);
  const sx = useMemo(() => {
    if (customSxEntries) return [...mainContainerSx, customSxEntries[1](pagerType)];
    return mainContainerSx;
  }, [customSxEntries]);

  return (
    <>
      {!isReaderRoute && <Navbar render={render} />}
      <Container sx={sx}>{children}</Container>
      <NotificationContainer />
    </>
  );
};
