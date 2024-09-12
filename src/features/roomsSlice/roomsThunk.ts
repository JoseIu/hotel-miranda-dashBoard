import { createAsyncThunk } from '@reduxjs/toolkit';

import apiFetch from '../../helpers/apiFetch';
import { RoomInterface, RoomToSend } from '../../interfaces/room.interface';

export const getAllRooms = createAsyncThunk('rooms/get', async (): Promise<RoomInterface[]> => {
  const response = await apiFetch('rooms', 'GET');

  return response.data as RoomInterface[];
});

export const getRomById = createAsyncThunk('room/get', async (id: string): Promise<RoomInterface> => {
  const response = await apiFetch('room', 'GET', id);

  return response.data as RoomInterface;
});

export const addNewRoom = createAsyncThunk('room/post', async (room: RoomToSend) => {
  await apiFetch('room', 'POST', null, room);
});

export const deleteRoom = createAsyncThunk('room/delete', async (id: string): Promise<string> => {
  await apiFetch('room', 'DELETE', id);
  return id;
});

export const updateRoom = createAsyncThunk('room/update', async (room: RoomInterface) => {
  await apiFetch('room', 'PUT', room._id, room);
});
