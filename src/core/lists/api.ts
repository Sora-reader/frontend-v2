import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { SaveListEditIn, SaveListEditOut, SaveLists } from './types';
import { camelCaseKeys } from '../../misc/utils';

const tags = ['Lists'];

export const saveListApi = createApi({
  reducerPath: 'saveListApi',
  async baseQuery(...args) {
    const res = await fetchBaseQuery({
      credentials: 'include',
      baseUrl: `${apiUrl}/lists/`,
    })(...args);
    if (res.data) res.data = camelCaseKeys(res.data);
    return res;
  },
  tagTypes: tags,
  endpoints: (builder) => ({
    getLists: builder.query<SaveLists, any>({
      query: () => ``,
      providesTags: tags,
    }),
    addToList: builder.mutation<SaveListEditOut, SaveListEditIn>({
      query: ({ listId, mangaId }) => ({
        url: `${listId}/${mangaId}/`,
        method: 'POST',
      }),
      invalidatesTags: tags,
    }),
    removeFromList: builder.mutation<SaveListEditOut, SaveListEditIn>({
      query: ({ listId, mangaId }) => ({
        url: `${listId}/${mangaId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: tags,
    }),
  }),
});

export const { useGetListsQuery, useAddToListMutation, useRemoveFromListMutation } = saveListApi;
