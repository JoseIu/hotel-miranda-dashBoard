import { createAsyncThunk } from '@reduxjs/toolkit';
import bookins from '../../db/bookins.json';
import apiFetch from '../../helpers/apiFetch';
import { BookingInterface, BookingToSendInterface } from '../../interfaces/booking.interface';

export const bookinsDB = [...bookins] as BookingInterface[];

export const getAllBookings = createAsyncThunk('bookins/get', async (): Promise<BookingInterface[]> => {
  const response = await apiFetch('bookings');
  return response.data as BookingInterface[];
});
export const getBooking = createAsyncThunk('booking/get', async (id: string): Promise<BookingInterface> => {
  const response = await apiFetch('booking', 'GET', id);
  return response.data as BookingInterface;
});

export const addBooking = createAsyncThunk(
  'booking/add',
  async (guest: BookingToSendInterface): Promise<BookingInterface> => {
    const response = await apiFetch('booking', 'POST', null, guest);
    console.log(response);
    return response.data as BookingInterface;
  }
);

export const deleteBooking = createAsyncThunk('booking/delete', async (id: string): Promise<string> => {
  await apiFetch('booking', 'DELETE', id);

  return id;
});

export const updateBooking = createAsyncThunk('booking/update', async (data: BookingInterface) => {
  await apiFetch('booking', 'PUT', data._id, data);
});
