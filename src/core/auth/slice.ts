import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TokenObtainIn, TokenObtainOut, TokenRefreshIn, TokenRefreshOut, TokenState } from './types';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { apiUrl } from '../api/const';
import { addNotification } from '../notificationSystem/slice';
import Router from 'next/router';
import { loginUrl } from '../routing';

const initialState: TokenState = {};
const apiPrefix = `${apiUrl}/token`;

// TODO: Generalize camelCasing the request. Create a custom baseQuery
// TODO: Generalize 401 handling


export const tokenObtainThunk = createAsyncThunk(
  'tokenObtain',
  async (data: TokenObtainIn, { dispatch }): Promise<TokenObtainOut> => {
    try {
      const response = await axios.post(`${apiPrefix}/pair`, data);
      return response.data;
    } catch (e) {
      if (String(e).includes('401'))
        dispatch(
          addNotification({
            type: 'danger',
            message: 'Неверный логин или пароль',
          })
        );
      throw e;
    }
  }
);

export const tokenRefreshThunk = createAsyncThunk(
  'tokenRefresh',
  async (data: TokenRefreshIn, { dispatch }): Promise<TokenRefreshOut> => {
    try {
      const response = await axios.post(`${apiPrefix}/refresh`, data);
      return response.data;
    } catch (e) {
      dispatch(
        addNotification({
          type: 'warning',
          message: 'Время сессии истекло',
        })
      );
      await Router.push(loginUrl);
      throw e;
    }
  }
);

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    reset: () => {
      new Cookies().remove('refresh');
      return initialState;
    },
    refresh: (state) => {
      state.access = 'accessToken';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tokenObtainThunk.fulfilled, (state, { payload: { username, refresh, access } }) => {
      new Cookies().set('refresh', refresh, { maxAge: 60 * 60 * 24 });
      return {
        username: username,
        access: access,
      };
    });
    builder.addCase(tokenRefreshThunk.fulfilled, (state, { payload: { refresh, access } }) => {
      new Cookies().set('refresh', refresh, { maxAge: 60 * 60 * 24 });
      state.access = access;
    });
  },
});

export const tokenReducer = tokenSlice.reducer;
