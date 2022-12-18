import { loginUrl } from './const';

export const baseRoutes = {
  '/': {
    name: 'Домой',
  },
  '/search': {
    name: 'Поиск',
  },
  '/lists': {
    name: 'Списки',
  },
  '/newChapters': {
    name: 'Новые главы',
  },
};

export const extraRoutes = {
  '/settings': {
    name: 'Настройки',
  },
  '/logout': {
    name: 'Выход',
  },
  loginUrl: {
    name: 'Вход',
  },
};

export const routes = {
  ...baseRoutes,
  ...extraRoutes,
};
