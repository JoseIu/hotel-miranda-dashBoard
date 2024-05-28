import { createAsyncThunk } from '@reduxjs/toolkit';
import bookins from '../../db/bookins.json';
import apiFetch from '../../helpers/apiFetch';
import { deleteBookingRequest, updateBookingRequest } from '../../helpers/bookingsRequest';
import { BookingInterface } from '../../interfaces/booking.interface';
import { BookingADD } from '../../interfaces/guest.interface';

export const bookinsDB = [...bookins] as BookingInterface[];

export const getAllBookings = createAsyncThunk('bookins/get', async (): Promise<BookingInterface[]> => {
  const response = await apiFetch('bookings');
  return response.data as BookingInterface[];
});
export const getBooking = createAsyncThunk('booking/get', async (id: string): Promise<BookingInterface> => {
  const response = await apiFetch('booking', 'GET', id);
  return response.data as BookingInterface;
});

export const addBooking = createAsyncThunk('booking/add', async (guest: BookingADD): Promise<BookingADD> => {
  return guest;
});

export const deleteBooking = createAsyncThunk('booking/delete', async (id: string): Promise<string> => {
  console.log(id);
  const response = await deleteBookingRequest(id);
  if (!response) throw new Error('Error deleting booking');
  return id;
});

export const updateBooking = createAsyncThunk(
  'booking/update',
  async (payload: { id: string; data: BookingInterface }) => {
    const { id, data } = payload;

    const response = await updateBookingRequest(id, data);

    if (!response) throw new Error('Error updating booking');
    return payload;
  }
);
