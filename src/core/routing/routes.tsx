import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export const baseRoutes = {
  '/': {
    name: 'Домой',
    icon: HomeIcon,
  },
  '/lists': {
    name: 'Списки',
    icon: FormatListBulletedIcon,
  },
  '/search': {
    name: 'Поиск',
    icon: SearchIcon,
  },
};

export const extraRoutes = {
  '/settings': {
    name: 'Настройки',
    icon: SettingsIcon,
  },
};

export const getAccountRoute = (): [string, any] => {
  let loggedIn = false;
  if (typeof window !== 'undefined') {
    loggedIn = !!document.cookie
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];
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
        '/login',
        {
          name: 'Вход',
          icon: LoginIcon,
        },
      ];
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};
