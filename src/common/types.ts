// Util type to add loading prop
export type LoadingProps = {
  loading: boolean,
}

export type PagerType = 'default' | 'webtoon';

const webtoonAspectRatioLowerThan = 7 / 16;  // Just a guess
export const getPagerType = (image: HTMLImageElement): PagerType => {
  return image.width / image.height <= webtoonAspectRatioLowerThan ? 'webtoon' : 'default';
}
