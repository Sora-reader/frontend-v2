import { MangaListType } from '../api/types';
import { listNames } from './const';

export type ListNameType = typeof listNames[number];

export type SaveList = {
  id: number;
  name: ListNameType;
  mangas: MangaListType;
};
export type SaveLists = Array<SaveList>;
export type SaveListEditOut = {
  count: number;
};

export type SaveListEditIn = { listId: number; mangaId: number };
