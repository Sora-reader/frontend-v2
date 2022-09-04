import {useTheme} from '@mui/joy';
import {useMediaQuery} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';

export const navbarWrapBreakpointKey = 'lg';

export const useIsNavbarWrapped = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(navbarWrapBreakpointKey));
};

/** A hook to determine if navbar animation can be turned on */
export const useAllowNavbarAnimation = () => {
  const [allowAnimation, setAllowAnimation] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navbarWrapped = useIsNavbarWrapped();

  // reset value if resized
  useEffect(() => {
    if (navbarWrapped) setAllowAnimation(false);
  }, [navbarWrapped]);

  // allow animation if element was hovered, ignore if navbar is wrapped
  // Invalidates on navbar wrapped status change
  const onMouseEnter = useCallback(() => {
    setHovered(true);
    if (!allowAnimation && !navbarWrapped) setAllowAnimation(true);
  }, [navbarWrapped]);

  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return {allowAnimation, hovered, onMouseEnter, onMouseLeave};
};
