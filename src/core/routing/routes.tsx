import HomeIcon from '@mui/icons-material/Home';
import ListsIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import NewChaptersIcon from '@mui/icons-material/AutoStories';
import { getRefreshTokenCookie } from '../auth/slice';
import { isClient } from '../../misc/utils';

const notificationRoute = () => {
  return [
    '/newChapters',
    {
      name: 'Новые главы',
      icon: NewChaptersIcon,
      badge: true,
    },
  ];
};

export const baseRoutes = {
  '/': {
    name: 'Домой',
    icon: HomeIcon,
  },
  '/search': {
    name: 'Поиск',
    icon: SearchIcon,
  },
  '/lists': {
    name: 'Списки',
    icon: ListsIcon,
  },
  notificationRoute,
};

export const loginUrl = '/login';

export const getAccountRoute = (): [string, any] => {
  let loggedIn = false;
  if (isClient()) {
    loggedIn = !!getRefreshTokenCookie();
  }
  return loggedIn
    ? [
        '/logout',
        {
          name: 'Выход',
          icon: LogoutIcon,
        },
      ]
    : [
        loginUrl,
        {
          name: 'Вход',
          icon: LoginIcon,
        },
      ];
};

export const extraRoutes = {
  '/settings': {
    name: 'Настройки',
    icon: SettingsIcon,
  },
  getAccountRoute,
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};

export const evalRoute = ([key, obj]) => {
  return typeof obj === 'function' ? obj() : [key, obj];
};
