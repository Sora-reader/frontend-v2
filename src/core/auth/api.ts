import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';

type LoginCredentials = {
  username: string;
  password: string;
};
type SessionResult = {
  session: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/auth/` }),
  endpoints: (builder) => ({
    login: builder.mutation<SessionResult, LoginCredentials>({
      query: (body) => ({
        url: 'login/',
        method: 'POST',
        body,
      }),
      transformResponse: ({ session }) => session,
    }),
  }),
});

export const { useLoginMutation } = userApi;
