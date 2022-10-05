import { Navbar, navbarWrapBreakpointKey } from './Navbar';
import { Box, Container, Theme } from '@mui/joy';
import { useCallback, useMemo } from 'react';
import { baseRoutes, extraRoutes, useActiveRoute, useIsReaderRoute } from '../../common/routes';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import { buttonContainerSx } from './Navbar/Navbar';
import { navbarSize } from '../../common/const';

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
