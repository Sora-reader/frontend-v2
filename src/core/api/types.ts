export type Image = string;
export type Genre = string;
export type Author = string;

export interface MangaType {
  id: number;
  sourceUrl: string;
  source: string;
  title: string;
  altTitle?: string;
  chaptersUrl?: string;
  rating?: string;
  thumbnail: string;
  image?: string;
  description: string;
  genres: Array<Genre>;
  authors: Array<Author>;
  status?: string;
  year?: string;
  modified?: string;
}

export interface ChapterType {
  id: number;
  title: string;
  link: string;
  number: number;
  volume: number;
}

// Collections

export type ParsingStatus = 'parsing' | 'upToDate';

export type ChapterListType = Array<ChapterType>;
export type ChapterImageList = Array<Image>;
export type MangaListType = Array<MangaType>;

interface WithStatus<T> {
  status: ParsingStatus;
  data: T;
}

export type MangaWithStatus = WithStatus<MangaType>;
export type ChaptersWithStatus = WithStatus<ChapterListType>;
export type ImagesWithStatus = WithStatus<ChapterImageList>;
