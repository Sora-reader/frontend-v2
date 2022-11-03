import { SaveLists } from './types';

export const inWhichListId = (id: number, data?: SaveLists) => {
  if (!data) return undefined;
  const res = data.filter((l) => l.mangas.filter((m) => m.id === id).length);
  return res.length ? res[0].id : undefined;
};
