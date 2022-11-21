import { Middleware, MiddlewareAPI } from 'redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { addNotification } from './slice';

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action) && ![401, 405, 425].includes(action?.payload?.status)) {
    let message = action?.payload?.data?.error || action?.payload?.error;
    if (!message) message = JSON.stringify(action.payload);

    api.dispatch(
      addNotification({
        // App-returned error or generic JS error
        message,
        type: 'danger',
      })
    );
  }

  return next(action);
};
