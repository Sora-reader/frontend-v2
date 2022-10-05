// TODO: not implemented yet
// export interface Category {
//
// }

// Base types and aliases

type Image = string;
type Genre = string;
type Author = string;
type ParsingStatus = 'parsing' | 'upToDate';

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

export type Chapters = Array<ChapterType>;
export type ChapterImageList = Array<Image>;

// Complex types

export interface MangaWithStatus {
  status: ParsingStatus;
  data: MangaType;
}

export interface ChaptersWithStatus {
  status: ParsingStatus;
  data: Chapters;
}

// Value examples/stubs

export const emptyManga: MangaType = {
  id: -1,
  title: '',
  sourceUrl: '',
  description: '',
  thumbnail: '',
  authors: [],
  genres: [],
};

export type MangaListType = Array<MangaType>;
