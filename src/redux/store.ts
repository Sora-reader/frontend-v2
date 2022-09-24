import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {mangaApi} from './api/manga';

const reducer = combineReducers({
  [mangaApi.reducerPath]: mangaApi.reducer,
});

export const makeStore = () => configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(mangaApi.middleware),
});

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export const wrapper = createWrapper(makeStore);
