import { createSlice } from '@reduxjs/toolkit';
import { Guest } from '../../interfaces/guest.interface';
import { addBooking, deleteBooking, getAllBookings, updateBooking } from './bookinsThunk';

interface Bookings {
  guests: Guest[];
  guest: Guest;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState: Bookings = {
  guests: [],
  guest: {} as Guest,
  loading: 'idle',
};

export const bookinsSlice = createSlice({
  name: 'bookins',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.guests = action.payload;
    });

    builder.addCase(getAllBookings.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.guests = state.guests.filter((guest) => guest.guest.reservationID !== action.payload);
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.guests.push(action.payload);
    });
    builder.addCase(updateBooking.fulfilled, (state, action) => {
      const guestIndex = state.guests.findIndex((guest) => guest.guest.reservationID === action.payload.id);

      if (guestIndex === -1) return;
      state.guests[guestIndex] = action.payload.data;
    });
  },
});

// export const { increment } = bookinsSlice.actions;
