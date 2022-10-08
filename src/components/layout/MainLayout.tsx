import { Box, Container, Theme } from '@mui/joy';
import { useCallback, useMemo } from 'react';
import { baseRoutes, extraRoutes, useActiveRoute, useIsReaderRoute } from '../../core/routing';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import { buttonContainerSx, Navbar } from './Navbar';
import { navbarSize } from './Navbar/const';
import { navbarWrapBreakpointKey } from './Navbar/utils';

const renderBaseNavbarIcons = (allowAnimation, hovered) => {
  const activeRoute = useActiveRoute();
  const iconExtraProps = {
    allowAnimation,
    hovered,
    activeRoute,
  };

  return (
    <>
      <Box id="base-routes" sx={buttonContainerSx}>
        {Object.entries(baseRoutes).map(([href, { name, icon: Icon }]) => (
          <NavbarRouteIcon key={href} name={name} href={href} {...iconExtraProps}>
            <Icon sx={{ margin: '8px' }} />
          </NavbarRouteIcon>
        ))}
      </Box>

      <Box id="extra-routes" sx={buttonContainerSx}>
        {Object.entries(extraRoutes).map(([href, { name, icon: Icon }]) => (
          <NavbarRouteIcon key={href} name={name} href={href} {...iconExtraProps}>
            <Icon sx={{ margin: '8px' }} />
          </NavbarRouteIcon>
        ))}
      </Box>
    </>
  );
};

const navbarPaddingSx = (theme: Theme) => ({
  [theme.breakpoints.down('sm')]: {
    paddingX: 0.5,
  },
  [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
    paddingBottom: `${navbarSize + 1}rem`,
  },
  [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
    paddingLeft: `${navbarSize + 1}rem`,
  },
});

export const MainLayout = ({ children }) => {
  const isReaderRoute = useIsReaderRoute();
  const render = useCallback(renderBaseNavbarIcons, []);

  const sx = useMemo(() => {
    if (isReaderRoute) return [navbarPaddingSx, { height: '100vh' }];
    return navbarPaddingSx;
  }, [isReaderRoute]);

  return (
    <>
      {!isReaderRoute && <Navbar render={render} />}
      <Container sx={sx}>{children}</Container>
    </>
  );
};
