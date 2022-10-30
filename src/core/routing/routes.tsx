import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

export const baseRoutes = {
  '/': {
    name: 'Home',
    icon: HomeIcon,
  },
  '/lists': {
    name: 'Lists',
    icon: FormatListBulletedIcon,
  },
  '/search': {
    name: 'Search',
    icon: SearchIcon,
  },
};

export const extraRoutes = {
  '/settings': {
    name: 'Settings',
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
          name: 'Logout',
          icon: LogoutIcon,
        },
      ]
    : [
        '/login',
        {
          name: 'Log In',
          icon: LoginIcon,
        },
      ];
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};
