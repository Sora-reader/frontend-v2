import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Manga} from '../../common/apiTypes';
import {apiUrl} from '../../common/const';

export const mangaAPIBaseUrl = `${apiUrl}/manga`;
export const mangaDetailQuery = (pk: string | number) => `${pk}/`;
export const mangaSearchQuery = (pk: string) => `search?title=${pk}`;

export const mangaApi = createApi({
  reducerPath: 'mangaAPI',
  baseQuery: fetchBaseQuery({baseUrl: mangaAPIBaseUrl}),
  endpoints: (builder) => ({
    detail: builder.query<Manga, string | number>({
      query: mangaDetailQuery,
    }),
    search: builder.query<Array<Manga>, string>({
      query: mangaSearchQuery,
    }),
  }),
});

export const {useDetailQuery, useSearchQuery} = mangaApi;
