import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorPaletteProp } from '@mui/joy/styles/types/colorSystem';

export interface NotificationType {
  id: number;
  type?: ColorPaletteProp;
  message?: string;
}

export type NotificationState = Array<NotificationType>;

export const notificationInitialState: NotificationState = [];

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: notificationInitialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<NotificationType, 'id'>>) => {
      const rand = Math.random();
      state.push({
        id: rand,
        ...action.payload,
      });
    },
    clearNotification: (state, action: PayloadAction<number>) => {
      console.log('Removing element', action.payload);
      return state.filter(n => n.id !== action.payload);
    }
  },
});

export const {addNotification, clearNotification} = NotificationSlice.actions;
export const notificationReducer = NotificationSlice.reducer;
