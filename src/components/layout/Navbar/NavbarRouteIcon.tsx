import { ColorPaletteProp, IconButton, IconButtonProps } from '@mui/joy';
import { useFakeAnchorProps } from '../../../misc/hooks';

type NavbarIconProps = Omit<IconButtonProps, 'color' | 'component'> & {
  name: string;
  href: string | null;
  activeRoute: string;
  allowAnimation: boolean;
  hovered: boolean;
};
export const NavbarRouteIcon = ({
  children,
  name,
  href,
  activeRoute,
  allowAnimation,
  hovered,
  ...props
}: NavbarIconProps) => {
  const color: ColorPaletteProp = activeRoute === href ? 'primary' : 'neutral';

  return (
    <IconButton
      color={color}
      {...(href === null ? {} : useFakeAnchorProps(href))}
      {...props}
      sx={{
        padding: 0,
        // Prevent text from showing
        '& svg': {
          margin: '8px',
        },
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'flex-start',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      {allowAnimation && <span>{name}</span>}
    </IconButton>
  );
};
