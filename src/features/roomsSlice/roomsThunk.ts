import { createAsyncThunk } from '@reduxjs/toolkit';

import apiFetch from '../../helpers/apiFetch';
import { RoomInterface, RoomToSend } from '../../interfaces/room.interface';

export const getAllRooms = createAsyncThunk('rooms/get', async (): Promise<RoomInterface[]> => {
  const response = await apiFetch('rooms', 'GET');

  return response.data as RoomInterface[];
});

export const getRomById = createAsyncThunk('room/get', async (id: string): Promise<RoomInterface> => {
  const response = await apiFetch('room', 'GET', id);
  console.log(response);

  return response.data as RoomInterface;
});

export const addNewRoom = createAsyncThunk('room/post', async (room: RoomToSend) => {
  const response = await apiFetch('room', 'POST', null, room);
  console.log(response);
});

export const deleteRoom = createAsyncThunk('room/delete', async (id: string): Promise<string> => {
  const response = await apiFetch('room', 'DELETE', id);
  console.log(response);
  return id;
});

export const updateRoom = createAsyncThunk('room/update', async (room: RoomInterface) => {
  const response = await apiFetch('room', 'PUT', room._id, room);
  console.log(room);

  console.log(response);
});
