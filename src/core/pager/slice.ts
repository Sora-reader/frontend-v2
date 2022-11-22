import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PagerType, SetPagerIn } from './types';

const initialState = null as PagerType | null;

export const pagerSlice = createSlice({
  name: 'pager',
  initialState,
  reducers: {
    setPagerType: (state, action: PayloadAction<SetPagerIn>) => {
      return action.payload;
    },
  },
});

export const pagerReducer = pagerSlice.reducer;
export const { setPagerType } = pagerSlice.actions;
