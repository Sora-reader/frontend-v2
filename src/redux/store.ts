import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const combinedReducer = combineReducers({
  // TODO: remove
  blank: function(state, action) {
    if (state == null) state = [];
    return state;
  },
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
    configureStore({
      // @ts-ignore
      reducer,
    });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export const wrapper = createWrapper(makeStore,
    // Uncomment when working with hydration and stuff
    // {debug: process.env.NODE_ENV === 'development'}
);
