import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { SaveList, SaveListEditIn, SaveListEditOut } from './types';

export const saveListApi = createApi({
  reducerPath: 'saveListApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/lists/`, credentials: 'include' }),
  endpoints: (builder) => ({
    getLists: builder.query<Array<SaveList>, any>({
      query: () => ``,
    }),
    addToList: builder.mutation<SaveListEditOut, SaveListEditIn>({
      query: ({ listPk, mangaPk }) => ({
        url: `${listPk}/${mangaPk}/`,
        method: 'POST',
      }),
    }),
    removeFromList: builder.mutation<SaveListEditOut, SaveListEditIn>({
      query: ({ listPk, mangaPk }) => ({
        url: `${listPk}/${mangaPk}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetListsQuery, useAddToListMutation, useRemoveFromListMutation } = saveListApi;
