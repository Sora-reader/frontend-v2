export type Bookmark = {
  chapterId: number | null;
};

export type BookmarkEditOut = {
  count: number;
};
export type BookmarkEditIn = {
  mangaId: number;
  chapterId: number;
};
