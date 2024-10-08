import { createSlice } from '@reduxjs/toolkit';
import { BookingInterface } from '../../interfaces/booking.interface';
import { addBooking, deleteBooking, getAllBookings, getBooking } from './bookinsThunk';

interface Bookings {
  bookins: BookingInterface[];
  bookin: BookingInterface | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState: Bookings = {
  bookins: [],
  bookin: null,
  loading: 'idle',
};

export const bookinsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.bookins = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getAllBookings.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(getBooking.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getBooking.fulfilled, (state, action) => {
      state.bookin = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getBooking.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookins = state.bookins.filter((guest) => guest._id !== action.payload);
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.bookins.push(action.payload);
    });
    // builder.addCase(updateBooking.fulfilled, (state, action) => {
    //   console.log(action);
    // });
  },
});
