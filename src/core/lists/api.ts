import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { SaveListEditIn, SaveListEditOut, SaveLists } from './types';

const tags = ['Lists'];

export const saveListApi = createApi({
  reducerPath: 'saveListApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/lists/`, credentials: 'include' }),
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
