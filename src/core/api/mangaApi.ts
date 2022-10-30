import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { camelCaseKeys } from '../../misc/utils';
import { ChaptersWithStatus, ImagesWithStatus, MangaListType, MangaWithStatus } from './types';
import { apiUrl } from './const';

const mangaAPIBaseUrl = `${apiUrl}/manga/`;
type PK = string | number;
type ImagesQueryArg = { mangaPk: PK; chapterPk: PK };

export const mangaApi = createApi({
  reducerPath: 'mangaAPI',
  async baseQuery(...args) {
    const res = await fetchBaseQuery({
      credentials: 'include',
      baseUrl: mangaAPIBaseUrl,
    })(...args);
    if (res.data) res.data = camelCaseKeys(res.data);
    return res;
  },
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  endpoints: (builder) => ({
    search: builder.mutation<MangaListType, string>({
      // query: (pk: string) => `search/?title=${pk}`,
      query: (pk) => `search/?title=${pk}`,
    }),
    detail: builder.query<MangaWithStatus, PK>({
      query: (pk: PK) => `${pk}/`,
    }),
    chapters: builder.query<ChaptersWithStatus, PK>({
      query: (pk: PK) => `${pk}/chapters/`,
    }),
    images: builder.query<ImagesWithStatus, ImagesQueryArg>({
      query: ({ mangaPk, chapterPk }: ImagesQueryArg) => `${mangaPk}/chapters/${chapterPk}/images/`,
    }),
  }),
});

export const {
  useSearchMutation,
  useDetailQuery,
  useChaptersQuery,
  useImagesQuery,
  util: { getRunningOperationPromises },
} = mangaApi;

export const { search, detail, chapters, images } = mangaApi.endpoints;
