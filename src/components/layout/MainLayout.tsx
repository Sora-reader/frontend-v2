import { Badge, Box, Container, Theme } from '@mui/joy';
import { Fragment, useCallback, useMemo } from 'react';
import { baseRoutes, evalRoute, extraRoutes, useActiveRoute, useIsReaderRoute } from '../../core/routing';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import { buttonContainerSx, Navbar } from './Navbar';
import { navbarSize } from './Navbar/const';
import { navbarWrapBreakpointKey } from './Navbar/utils';
import { NotificationContainer } from '../../core/notificationSystem/components/NotificationContainer';

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
      <Wrapper>
        <NavbarRouteIcon key={href} name={name} href={href} {...iconExtraProps}>
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

export const MainLayout = ({ children }) => {
  const isReaderRoute = useIsReaderRoute();
  const render = useCallback(renderBaseNavbarIcons, []);

  // 100vh doesn't work when mobile app bar is visible :)
  const jsViewportHeight = useMemo(
    () => (typeof window !== 'undefined' && `${window.innerHeight}px`) || '100vh',
    undefined
  );

  const sx = useMemo(() => {
    if (isReaderRoute)
      return [
        ...mainContainerSx,
        {
          height: jsViewportHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // Override padding so the image is not affected by navbar size padding
          padding: '0 !important',
        },
      ];
    return [
      ...mainContainerSx,
      {
        my: 1,
      },
    ];
  }, [isReaderRoute]);

  return (
    <>
      {!isReaderRoute && <Navbar render={render} />}
      <Container sx={sx}>{children}</Container>
      <NotificationContainer />
    </>
  );
};
