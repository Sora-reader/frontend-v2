import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ChaptersWithStatus, ImagesWithStatus, MangaListType, MangaWithStatus } from './types';
import { apiUrl } from './const';
import { fbqBoilerplate } from './utils';

const baseUrl = `${apiUrl}/manga/`;
type PK = string | number;
type ImagesQueryArg = { mangaId: PK; chapterPk: PK };

export const mangaApi = createApi({
  reducerPath: 'mangaAPI',
  baseQuery: fbqBoilerplate(baseUrl, false),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    search: builder.query<MangaListType, string>({
      query: (pk) => `search/?title=${pk}`,
    }),
    detail: builder.query<MangaWithStatus, PK>({
      query: (pk: PK) => `${pk}/`,
    }),
    chapters: builder.query<ChaptersWithStatus, PK>({
      query: (pk: PK) => `${pk}/chapters/`,
    }),
    images: builder.query<ImagesWithStatus, ImagesQueryArg>({
      query: ({ mangaId, chapterPk }: ImagesQueryArg) => `${mangaId}/chapters/${chapterPk}/images/`,
    }),
  }),
});

export const {
  useSearchQuery,
  useLazySearchQuery,
  useDetailQuery,
  useChaptersQuery,
  useImagesQuery,
  util: { getRunningQueriesThunk },
} = mangaApi;

export const { search, detail, chapters, images } = mangaApi.endpoints;
