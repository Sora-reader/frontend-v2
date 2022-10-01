import Card from '@mui/joy/Card';
import style from './navbar.module.scss';
import clsx from 'clsx';
import {navbarWrapBreakpointKey, useAllowNavbarAnimation} from './utils';
import {navbarSize} from '../../../common/const';
import {Theme} from "@mui/joy";

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

export const buttonContainerSx = (theme: Theme) => ({
  display: 'flex',
  [theme.breakpoints.down(navbarWrapBreakpointKey)]: {
    flexFlow: 'row nowrap',
  },
  [theme.breakpoints.up(navbarWrapBreakpointKey)]: {
    flexFlow: 'column nowrap',
  },
  gap: '1rem',
});

type NavbarProps = {
  render: (allowAnimation: boolean, hovered: boolean) => JSX.Element,
}

export const Navbar = ({render}: NavbarProps) => {
  const {allowAnimation, hovered, ...hoverListeners} = useAllowNavbarAnimation();

  return <Card className={clsx(allowAnimation && style.navbar)} {...hoverListeners} sx={navbarSx}>
    {render(allowAnimation, hovered)}
  </Card>;
};
