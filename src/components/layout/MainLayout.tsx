import {Navbar, navbarWrapBreakpointKey} from './Navbar';
import {Box, Container, Theme} from '@mui/joy';
import {navbarSize} from '../../common/const';
import {useCallback} from 'react';
import {baseRoutes, extraRoutes, useActiveRoute} from '../../common/routes';
import {NavbarRouteIcon} from "./Navbar/NavbarRouteIcon";

const buttonContainerSx = (theme: Theme) => ({
  display: 'flex',
  [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
    flexFlow: 'row nowrap',
  },
  [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
    flexFlow: 'column nowrap',
  },
  gap: '1rem',
});

export const MainLayout = ({children}) => {
  const activeRoute = useActiveRoute();

  const renderBaseNavbarIcons = useCallback((allowAnimation, hovered) => {
    const iconExtraProps = {
      allowAnimation,
      hovered,
      activeRoute,
    };

    return <>
      <Box id="base-routes" sx={buttonContainerSx}>
        {Object.entries(baseRoutes).map(
          ([href, {name, icon}]) => <NavbarRouteIcon key={href} name={name} href={href} {...iconExtraProps}>
            {icon}
          </NavbarRouteIcon>,
        )}
      </Box>

      <Box id="extra-routes" sx={buttonContainerSx}>
        {Object.entries(extraRoutes).map(
          ([href, {name, icon}]) => <NavbarRouteIcon key={href} name={name} href={href} {...iconExtraProps}>
            {icon}
          </NavbarRouteIcon>,
        )}
      </Box>
    </>;
  }, []);

  return <>
    <Navbar render={renderBaseNavbarIcons}/>
    <Container sx={(theme) => ({
      [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
        paddingBottom: `${navbarSize + 1}rem`,
      },
      [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
        paddingLeft: `${navbarSize + 1}rem`,
      },
    })}>
      {children}
    </Container>
  </>;
};
