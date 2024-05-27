import { createAsyncThunk } from '@reduxjs/toolkit';
import bookins from '../../db/bookins.json';
import apiFetch from '../../helpers/apiFetch';
import {
  addBookingRequest,
  deleteBookingRequest,
  getBookingRequest,
  updateBookingRequest,
} from '../../helpers/bookingsRequest';
import { BookingADD, BookingInterface } from '../../interfaces/guest.interface';

export const bookinsDB = [...bookins] as BookingInterface[];

export const getAllBookings = createAsyncThunk('bookins/get', async (): Promise<BookingInterface[]> => {
  // const response = await asyncRequest<BookingInterface>({ data: bookins as BookingInterface[] });
  const response = await apiFetch('/bookings');
  return response.data as BookingInterface[];
});
export const getBooking = createAsyncThunk('booking/get', async (id: string): Promise<BookingInterface> => {
  const response = await getBookingRequest(id);
  console.log(response);
  return response as BookingInterface;
});

export const addBooking = createAsyncThunk('booking/add', async (guest: BookingADD): Promise<BookingADD> => {
  const response = await addBookingRequest(guest);
  if (!response) throw new Error('Error adding booking');
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
