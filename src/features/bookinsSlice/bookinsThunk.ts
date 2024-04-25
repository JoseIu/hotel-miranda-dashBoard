import { createAsyncThunk } from '@reduxjs/toolkit';
import bookins from '../../db/bookins.json';
import { asyncRequest } from '../../helpers/asyncRequest';
import {
  addBookingRequest,
  deleteBookingRequest,
  getBookingRequest,
  updateBookingRequest,
} from '../../helpers/bookingsRequest';
import { Guest } from '../../interfaces/guest.interface';

export const bookinsDB = [...bookins] as Guest[];

export const getAllBookings = createAsyncThunk('bookins/get', async (): Promise<Guest[]> => {
  const response = await asyncRequest<Guest>({ data: bookinsDB });

  return response as Guest[];
});

export const getBooking = createAsyncThunk('booking/get', async (id: string): Promise<Guest> => {
  const response = await getBookingRequest(id);
  console.log(response);
  return response as Guest;
});

export const addBooking = createAsyncThunk('booking/add', async (guest: Guest): Promise<Guest> => {
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
  async (payload: { id: string; data: Guest }) => {
    const { id, data } = payload;

    const response = await updateBookingRequest(id, data);

    if (!response) throw new Error('Error updating booking');
    return payload;
  }
);
