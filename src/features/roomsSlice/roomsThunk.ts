import { createAsyncThunk } from '@reduxjs/toolkit';
import { asyncRequest, asyncRequestFake } from '../../helpers/asyncRequest';
import { Room } from '../../interfaces/room';

import roomList from '../../db/roomList.json';
// const rooms = [...roomList] as Room[];

export const getAllRooms = createAsyncThunk('bookins/get', async (): Promise<Room[]> => {
  const response = await asyncRequest<Room>({ data: roomList as Room[] });

  return response as Room[];
});

export const getRom = createAsyncThunk('booking/get', async (id: string): Promise<string> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error getting room');
  return id;
});

export const addNewRoom = createAsyncThunk('booking/add', async (room: Room): Promise<Room> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error adding room');

  return room;
});

export const deleteRoom = createAsyncThunk('booking/delete', async (id: string): Promise<string> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error deleting room');
  return id;
});

export const updateRoom = createAsyncThunk('booking/update', async (room: Room): Promise<Room> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error updating room');

  return room;
});
