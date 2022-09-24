import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ChaptersWithStatus, Manga, MangaWithStatus} from '../../common/apiTypes';
import {apiUrl} from '../../common/const';
import {HYDRATE} from 'next-redux-wrapper';

export const mangaAPIBaseUrl = `${apiUrl}/manga/`;
export const mangaSearchQuery = (pk: string) => `search/?title=${pk}`;
export const mangaDetailQuery = (pk: string | number) => `${pk}/`;
export const mangaChaptersQuery = (pk: string | number) => `${pk}/chapters/`;

export type MangaPK = string | number;

export const mangaApi = createApi({
  reducerPath: 'mangaAPI',
  baseQuery: fetchBaseQuery({baseUrl: mangaAPIBaseUrl}),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    search: builder.query<Array<Manga>, string>({
      query: mangaSearchQuery,
    }),
    detail: builder.query<MangaWithStatus, MangaPK>({
      query: mangaDetailQuery,
    }),
    chapters: builder.query<ChaptersWithStatus, MangaPK>({
      query: mangaChaptersQuery,
    }),
  }),
});

export const {
  useSearchQuery, useDetailQuery, useChaptersQuery,
  util: {getRunningOperationPromises},
} = mangaApi;

export const {search, detail, chapters} = mangaApi.endpoints;
