import { Badge, Box } from '@mui/joy';
import { useActiveRoute } from '../../core/routing';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import HomeIcon from '@mui/icons-material/Home';
import ListsIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/MeetingRoom';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NewChaptersIcon from '@mui/icons-material/AutoStories';
import { buttonContainerSx, Navbar } from './Navbar';
import { signOut, useSession } from 'next-auth/react';
import { loginUrl } from '../../core/routing/const';

const renderBaseNavbarIcons = (allowAnimation, hovered) => {
  const activeRoute = useActiveRoute();
  const iconExtraProps = {
    allowAnimation,
    hovered,
    activeRoute,
  };
  const NewChaptersWrapper = Badge;
  const { data: session } = useSession();

  return (
    <>
      <Box id="base-routes" sx={buttonContainerSx}>
        <NavbarRouteIcon name={'Домой'} href={'/'} children={<HomeIcon />} {...iconExtraProps} />
        <NavbarRouteIcon name={'Поиск'} href={'/search'} children={<SearchIcon />} {...iconExtraProps} />
        <NavbarRouteIcon name={'Списки'} href={'/lists'} children={<ListsIcon />} {...iconExtraProps} />
        <NewChaptersWrapper>
          <NavbarRouteIcon
            name={'Новые главы'}
            href={'/newChapters'}
            children={<NewChaptersIcon />}
            {...iconExtraProps}
          />
        </NewChaptersWrapper>
      </Box>
      <Box id="extra-routes" sx={buttonContainerSx}>
        <NavbarRouteIcon
          name={'Настройки'}
          href={'/settings'}
          children={<SettingsIcon />}
          {...iconExtraProps}
        />
        {session ? (
          <NavbarRouteIcon
            name={'Выход'}
            href={null}
            children={<LogoutIcon />}
            onClick={() => signOut({ callbackUrl: loginUrl, redirect: true })}
            {...iconExtraProps}
          />
        ) : (
          <NavbarRouteIcon name={'Вход'} href={'/login'} children={<LoginIcon />} {...iconExtraProps} />
        )}
      </Box>
    </>
  );
};

export const BaseNavbar = () => {
  return <Navbar render={renderBaseNavbarIcons} />;
};
