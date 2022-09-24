import Card from '@mui/joy/Card';
import {ColorPaletteProp, IconButton, IconButtonProps, Sheet, Theme} from '@mui/joy';

import style from './navbar.module.scss';
import clsx from 'clsx';
import {navbarWrapBreakpointKey, useAllowNavbarAnimation} from './utils';
import {baseRoutes, extraRoutes, useActiveRoute} from '../../../common/routes';
import {useFakeAnchorProps} from '../../../common/hooks';
import {navbarSize} from '../../../common/const';

const navbarSx = (theme) => ({
  position: 'fixed',
  left: 0,
  zIndex: 1,
  // flex
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  // media
  [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
    bottom: 0,
    // size
    width: '100vw',
    height: `${navbarSize}rem`,
    // flex
    flexFlow: 'row nowrap',
    // borders
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
    top: 0,
    // size
    width: `${navbarSize}rem`,
    height: '100vh',
    // borders
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

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

type NavbarIconProps = Omit<IconButtonProps, 'color' | 'component'> & { name: string, href: string };

export const Navbar = () => {
  const {allowAnimation, hovered, ...hoverListeners} = useAllowNavbarAnimation();

  const NavbarIcon = ({children, name, href, ...props}: NavbarIconProps) => {
    const activeRoute = useActiveRoute();
    const color: ColorPaletteProp = activeRoute === href ? 'primary' : 'neutral';

    return <Sheet>
      <IconButton color={color} {...useFakeAnchorProps(href)} {...props}>
        {children}
        {allowAnimation && hovered && <span>{name}</span>}
      </IconButton>
    </Sheet>;
  };

  return <Card className={clsx(allowAnimation && style.navbar)} {...hoverListeners} sx={navbarSx}>
    <Sheet id="base-routes" sx={buttonContainerSx}>
      {Object.entries(baseRoutes).map(
          ([href, {name, icon}]) => <NavbarIcon key={href} name={name} href={href}>
            {icon}
          </NavbarIcon>,
      )}
    </Sheet>

    <Sheet id="extra-routes" sx={buttonContainerSx}>
      {Object.entries(extraRoutes).map(
          ([href, {name, icon}]) => <NavbarIcon key={href} name={name} href={href}>
            {icon}
          </NavbarIcon>,
      )}
    </Sheet>
  </Card>;
};
