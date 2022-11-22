import { Dispatch, SetStateAction } from 'react';
import { ImageProps } from '../../../core/pager/types';

export type WebtoonImageProps = ImageProps & {
  position: number;
  setPage: Dispatch<SetStateAction<number>>;
};
