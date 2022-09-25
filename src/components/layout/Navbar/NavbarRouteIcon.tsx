import {ColorPaletteProp, IconButton, IconButtonProps, Sheet} from '@mui/joy';
import {useFakeAnchorProps} from "../../../common/hooks";

type NavbarIconProps = Omit<IconButtonProps, 'color' | 'component'> & {
  name: string,
  href: string,
  activeRoute: string,
  allowAnimation: boolean,
  hovered: boolean,
};
export const NavbarRouteIcon = (
  {
    children,
    name,
    href,
    activeRoute,
    allowAnimation,
    hovered,
    ...props
  }: NavbarIconProps) => {
  const color: ColorPaletteProp = activeRoute === href ? 'primary' : 'neutral';

  return <Sheet>
    <IconButton color={color} {...useFakeAnchorProps(href)} {...props}>
      {children}
      {allowAnimation && hovered && <span>{name}</span>}
    </IconButton>
  </Sheet>;
};
