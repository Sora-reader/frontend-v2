import { createApi } from '@reduxjs/toolkit/query/react';
import { apiUrl } from '../api/const';
import { ChapterNotificationEditIn, ChapterNotificationEditOut, ChapterNotificationList } from './types';
import { fbqWithRefresh } from '../api/utils';

const tags = ['ChapterNotifications'];

export const chapterNotificationApi = createApi({
  reducerPath: 'chapterNotificationApi',
  baseQuery: fbqWithRefresh(`${apiUrl}/chapterNotifications/`, true),
  tagTypes: tags,
  endpoints: (builder) => ({
    getChapterNotifications: builder.query<ChapterNotificationList, any>({
      query: () => `/`,
      providesTags: tags,
    }),
    removeChapterNotification: builder.mutation<ChapterNotificationEditOut, ChapterNotificationEditIn>({
      query: (notificationId) => ({
        url: `${notificationId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: tags,
    }),
  }),
});

export const { useGetChapterNotificationsQuery, useRemoveChapterNotificationMutation } =
  chapterNotificationApi;
