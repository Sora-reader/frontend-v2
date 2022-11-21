import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorPaletteProp } from '@mui/joy/styles/types/colorSystem';

export interface NotificationType {
  id: number;
  type?: ColorPaletteProp;
  message?: string;
}

export type NotificationState = Array<NotificationType>;

const initialState: NotificationState = [];

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<NotificationType, 'id'>>) => {
      const rand = Math.random();
      state.push({
        id: rand,
        ...action.payload,
      });
    },
    clearNotification: (state, action: PayloadAction<number>) => {
      return state.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, clearNotification } = NotificationSlice.actions;
export const notificationReducer = NotificationSlice.reducer;
