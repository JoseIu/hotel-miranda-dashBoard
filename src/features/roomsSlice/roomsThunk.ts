import { createAsyncThunk } from '@reduxjs/toolkit';
import { asyncRequestFake } from '../../helpers/asyncRequest';
import { Room } from '../../interfaces/room';

import apiFetch from '../../helpers/apiFetch';
import { RoomInterface } from '../../interfaces/room.interface';
// const rooms = [...roomList] as Room[];

export const getAllRooms = createAsyncThunk('rooms/get', async (): Promise<RoomInterface[]> => {
  const response = await apiFetch('rooms', 'GET');

  return response.data as RoomInterface[];
});

export const getRomById = createAsyncThunk('room/get', async (id: string): Promise<RoomInterface> => {
  const response = await apiFetch('room', 'GET', id);
  console.log(response);

  return response.data as RoomInterface;
});

export const addNewRoom = createAsyncThunk('room/add', async (room: Room): Promise<Room> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error adding room');

  return room;
});

export const deleteRoom = createAsyncThunk('room/delete', async (id: string): Promise<string> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error deleting room');
  return id;
});

export const updateRoom = createAsyncThunk('room/update', async (room: Room): Promise<Room> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error updating room');

  return room;
});
