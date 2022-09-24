import {useMemo} from 'react';

// TODO: not implemeted yet
// export interface Category {
//
// }

type Genre = string;
type Author = string;
type ParsingStatus = 'parsing' | 'upToDate';

export interface Manga {
  id: number,
  source_url: string,
  title: string,
  alt_title?: string,
  rating?: string,
  thumbnail: string,
  image?: string,
  description: string,
  genres: Array<Genre>,
  authors: Array<Author>,
  status?: string,
  year?: string,
  modified?: string,
}

export interface ChapterType {
  title: string,
  link: string,
  number: number,
  volume: number,
}

export type Chapters = Array<ChapterType>;

export interface MangaWithStatus {
  status: ParsingStatus,
  data: Manga,
}

export interface ChaptersWithStatus {
  status: ParsingStatus,
  data: Chapters,
}

// TODO: find a better place for those utils
export const emptyManga: Manga = {
  id: -1,
  title: '',
  source_url: '',
  description: '',
  thumbnail: '',
  authors: [],
  genres: [],
};

export const useIsEmptyManga = (value: Manga | number) => useMemo(
    () => Number.isInteger(value) ? !~value : !~(value as Manga).id,
    [value],
);

