import { createApi } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { SaveListEditIn, SaveListEditOut, SaveLists } from './types';
import { fbqWithRefresh } from '../api/utils';

const tags = ['Lists'];

export const saveListApi = createApi({
  reducerPath: 'saveListApi',
  baseQuery: fbqWithRefresh(`${apiUrl}/lists/`, true),
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
export const { getLists } = saveListApi.endpoints;
