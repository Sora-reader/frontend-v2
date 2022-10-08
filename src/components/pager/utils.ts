import { PagerType } from './types';

const webtoonAspectRatioLowerThan = 7 / 16; // Just a guess
export const getPagerType = (image: HTMLImageElement): PagerType => {
  return image.width / image.height <= webtoonAspectRatioLowerThan ? 'webtoon' : 'default';
};
