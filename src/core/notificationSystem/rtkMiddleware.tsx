import { Middleware, MiddlewareAPI } from 'redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { addNotification } from './slice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    api.dispatch(addNotification({ message: action?.payload?.error || action.error?.data?.message }));
  }

  return next(action);
};
