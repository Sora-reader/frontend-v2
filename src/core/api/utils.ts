import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { camelCaseKeys } from '../../misc/utils';
import { handleQueryAuthRefresh } from '../auth/utils';

/** Boilerplate for fetchBaseQuery with camelCasing and auth option */
export const fbqBoilerplate =
  (baseUrl, auth): BaseQueryFn =>
  async (args, api, ...rest) => {
    let headers = {};
    if (auth) {
      const state = api.getState() as RootState;
      headers = {
        Authorization: `Bearer ${state.token?.access}`,
      };
    }

    const res = await fetchBaseQuery({
      headers,
      baseUrl,
    })(args, api, ...rest);

    if (res.data) res.data = camelCaseKeys(res.data);
    return res;
  };

/** Another fetchBaseQuery boilerplate, but with token refreshing */
export const fbqWithRefresh =
  (baseUrl, auth: boolean = false): BaseQueryFn =>
  async (args, api, ...other) => {
    let res = await fbqBoilerplate(baseUrl, auth)(args, api, ...other);

    const refreshed = await handleQueryAuthRefresh(res, api.dispatch);
    if (refreshed) {
      res = await fbqBoilerplate(baseUrl, auth)(args, api, ...other);
    }

    return res;
  };
