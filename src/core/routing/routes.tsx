import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

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
  '/profile': {
    name: 'Profile',
    icon: AccountBoxIcon,
  },
  '/logout': {
    name: 'Logout',
    icon: LogoutIcon,
  },
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};
