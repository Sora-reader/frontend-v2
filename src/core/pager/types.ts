import { Dispatch, SetStateAction } from 'react';
import { ChapterImageList } from '../api/types';

export type PagerType = 'default' | 'webtoon';

export type SetPagerIn = PagerType;

export type PagerProps = {
  images: ChapterImageList;
  setPage: Dispatch<SetStateAction<number>>;
  setShowNavbar: () => any;
};

export type ImageProps = {
  src: string;
  priority?: boolean;
  setShowNavbar: () => any;
  alt;
};
