import { Dispatch, SetStateAction } from 'react';
import { ChapterImageList } from '../../common/apiTypes';

export type PagerProps = {
  images: ChapterImageList;
  setPage: Dispatch<SetStateAction<number>>;
  setShowNavbar: () => any;
};

export type ImageProps = {
  src: string;
  setShowNavbar: () => any;
};
