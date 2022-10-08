export type Image = string;
export type Genre = string;
export type Author = string;

export interface MangaType {
  id: number;
  sourceUrl: string;
  title: string;
  altTitle?: string;
  rssUrl?: string;
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

export interface MangaWithStatus {
  status: ParsingStatus;
  data: MangaType;
}

export interface ChaptersWithStatus {
  status: ParsingStatus;
  data: ChapterListType;
}
