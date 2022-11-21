import { loginUrl } from '../routing';
import Router from 'next/router';
import { AppDispatch } from '../store';
import { addNotification } from '../notificationSystem/slice';

export const handle401res = async (res, ssr: boolean, dispatch: AppDispatch) => {
  if (res?.error?.status === 401) {
    if (ssr) {
      return {
        redirect: {
          destination: loginUrl,
          permanent: false,
        },
      };
    } else if (typeof window !== 'undefined') {
      if (dispatch)
        await dispatch(
          addNotification({
            type: 'danger',
            message: 'Для использования этой функции, пожалуйста, войдите',
          })
        );
      await Router.push(loginUrl);
    }
  }
};
