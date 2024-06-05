import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { bookinsSlice } from '../features/bookinsSlice/bookinsSlice';
import { contactSlice } from '../features/contactSlice/contactSlice';
import { roomsSlice } from '../features/roomsSlice/roomsSlice';
import { usersSlice } from '../features/usersSlice/usersSlice';

export const store = configureStore({
  reducer: {
    bookings: bookinsSlice.reducer,
    rooms: roomsSlice.reducer,
    users: usersSlice.reducer,
    contacts: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
