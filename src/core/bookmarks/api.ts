import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { Bookmark, BookmarkEditIn, BookmarkEditOut } from './types';
import { camelCaseKeys } from '../../misc/utils';

const tags = ['Bookmarks'];

export const bookmarkApi = createApi({
  reducerPath: 'bookmarkApi',
  async baseQuery(...args) {
    const res = await fetchBaseQuery({
      credentials: 'include',
      baseUrl: `${apiUrl}/bookmarks/`,
    })(...args);
    if (res.data) res.data = camelCaseKeys(res.data);
    return res;
  },
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
