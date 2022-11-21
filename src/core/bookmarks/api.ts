import { createApi } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { Bookmark, BookmarkEditIn, BookmarkEditOut } from './types';
import { fbqWithRefresh } from '../api/utils';

const tags = ['Bookmarks'];

export const bookmarkApi = createApi({
  reducerPath: 'bookmarkApi',
  baseQuery: fbqWithRefresh(`${apiUrl}/bookmarks/`, true),
  tagTypes: tags,
  endpoints: (builder) => ({
    getBookmark: builder.query<Bookmark, number>({
      query: (mangaId) => `${mangaId}/`,
      providesTags: tags,
    }),
    setBookmark: builder.mutation<BookmarkEditOut, BookmarkEditIn>({
      query: ({ mangaId, chapterId }) => ({
        url: `${mangaId}/${chapterId}/`,
        method: 'POST',
      }),
      invalidatesTags: tags,
    }),
    removeBookmark: builder.mutation<BookmarkEditOut, BookmarkEditIn>({
      query: ({ mangaId, chapterId }) => ({
        url: `${mangaId}/${chapterId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: tags,
    }),
  }),
});

export const { useGetBookmarkQuery, useSetBookmarkMutation, useRemoveBookmarkMutation } = bookmarkApi;
