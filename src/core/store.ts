import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { mangaApi } from './api/mangaApi';
import { notificationReducer } from './notificationSystem/slice';
import { rtkQueryErrorLogger } from './notificationSystem/middleware';
import { saveListApi } from './lists/api';
import { bookmarkApi } from './bookmarks/api';
import { chapterNotificationApi } from './chapterNotifications/api';
import { pagerReducer } from './pager/slice';

const combinedReducer = combineReducers({
  [mangaApi.reducerPath]: mangaApi.reducer,
  [saveListApi.reducerPath]: saveListApi.reducer,
  [bookmarkApi.reducerPath]: bookmarkApi.reducer,
  [chapterNotificationApi.reducerPath]: chapterNotificationApi.reducer,
  notification: notificationReducer,
  pager: pagerReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: (state, action) => {
      if (action.type === HYDRATE) {
        // As is for now. Possibly can be leveraged later
        return combinedReducer(state, action);
      } else {
        return combinedReducer(state, action);
      }
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(mangaApi.middleware)
        .concat(saveListApi.middleware)
        .concat(bookmarkApi.middleware)
        .concat(chapterNotificationApi.middleware)
        .concat(rtkQueryErrorLogger),
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore);
