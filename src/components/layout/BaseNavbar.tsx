import { Badge, Box, Container, Theme } from '@mui/joy';
import { Fragment, useCallback, useMemo } from 'react';
import { baseRoutes, evalRoute, extraRoutes, useActiveRoute, useIsReaderRoute } from '../../core/routing';
import { NavbarRouteIcon } from './Navbar/NavbarRouteIcon';
import { navbarSize } from './Navbar/const';
import { navbarWrapBreakpointKey } from './Navbar/utils';
import { NotificationContainer } from '../../core/notificationSystem/components/NotificationContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import ListsIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NewChaptersIcon from '@mui/icons-material/AutoStories';
import { useGetChapterNotificationsQuery } from '../../core/chapterNotifications/api';
import { isClient } from '../../misc/utils';
import { buttonContainerSx, Navbar } from "./Navbar";
import { getRefreshTokenCookie } from "../../core/auth/slice";

const renderBaseNavbarIcons = (allowAnimation, hovered) => {
  const activeRoute = useActiveRoute();
  const iconExtraProps = {
    allowAnimation,
    hovered,
    activeRoute,
  };
  const { data: chaptersUpdated, isLoading } = useGetChapterNotificationsQuery(null);
  const NewChaptersWrapper = Badge;

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
        {isClient() && !!getRefreshTokenCookie() ? (
          <NavbarRouteIcon name={'Выход'} href={'/logout'} children={<LogoutIcon />} {...iconExtraProps} />
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
