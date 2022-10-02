import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ChapterImageList, ChaptersWithStatus, MangaListType, MangaWithStatus} from '../../common/apiTypes';
import {apiUrl} from '../../common/const';
import {HYDRATE} from 'next-redux-wrapper';

const mangaAPIBaseUrl = `${apiUrl}/manga/`;
type PK = string | number;
type ImagesQueryArg = { mangaPk: PK, chapterPk: PK };

export const mangaApi = createApi({
  reducerPath: 'mangaAPI',
  baseQuery: fetchBaseQuery({baseUrl: mangaAPIBaseUrl}),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    search: builder.query<MangaListType, string>({
      query: (pk: string) => `search/?title=${pk}`,
    }),
    detail: builder.query<MangaWithStatus, PK>({
      query: (pk: PK) => `${pk}/`,
    }),
    chapters: builder.query<ChaptersWithStatus, PK>({
      query: (pk: PK) => `${pk}/chapters/`,
    }),
    images: builder.query<ChapterImageList, ImagesQueryArg>({
      query: ({mangaPk, chapterPk}: ImagesQueryArg) => `${mangaPk}/chapters/${chapterPk}/images/`,
    }),
  }),
});

export const {
  useSearchQuery, useDetailQuery, useChaptersQuery, useImagesQuery,
  util: {getRunningOperationPromises},
} = mangaApi;

export const {search, detail, chapters, images} = mangaApi.endpoints;
