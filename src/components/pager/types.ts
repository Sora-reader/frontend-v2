import { Dispatch, SetStateAction } from 'react';
import { ChapterImageList } from '../../core/api/types';

export type PagerType = 'default' | 'webtoon';

export type PagerProps = {
  images: ChapterImageList;
  setPage: Dispatch<SetStateAction<number>>;
  setShowNavbar: () => any;
};

export type ImageProps = {
  src: string;
  setShowNavbar: () => any;
};
