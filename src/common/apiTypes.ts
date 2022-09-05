// TODO: not implemeted yet
// export interface Genre {
//
// }
//
// export interface Category {
//
// }

import {useMemo} from 'react';

export interface Manga {
  id: number,
  source_url: string,
  title: string,
  alt_title?: string,
  rating?: number,
  thumbnail: string,
  image?: string,
  description: string,
  // genres:	Array<Genre>,
  // categories:	Array<Category>,
  status?: string,
  year?: string,
  modified?: string,
}

// TODO: find a better place for those utils
export const emptyManga: Manga = {
  id: -1,
  title: '',
  source_url: '',
  description: '',
  thumbnail: '',
};

export const useIsEmptyManga = (value: Manga | number) => useMemo(
    () => Number.isInteger(value) ? !~value : !~(value as Manga).id,
    [],
);

