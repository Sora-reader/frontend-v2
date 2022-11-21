import { loginUrl } from '../routing';
import Router from 'next/router';
import { AppDispatch } from '../store';
import { addNotification } from '../notificationSystem/slice';
import { tokenRefreshThunk } from './slice';

export const handleQueryAuthRefresh = async (res, dispatch: AppDispatch) => {
  if (res?.error?.status === 401) {
    const action = await dispatch(tokenRefreshThunk(null));

    if (tokenRefreshThunk.rejected.match(action)) {
      await dispatch(
        addNotification({
          type: 'danger',
          message: 'Для использования этой функции, пожалуйста, войдите',
        })
      );
      await Router.push(loginUrl);
    }

    return true;
  }
};
