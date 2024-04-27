import { createAsyncThunk } from '@reduxjs/toolkit';
import { asyncRequest, asyncRequestFake } from '../../helpers/asyncRequest';
import { Room } from '../../interfaces/room';

import roomList from '../../db/roomList.json';
// const rooms = [...roomList] as Room[];

export const getAllRooms = createAsyncThunk('rooms/get', async (): Promise<Room[]> => {
  const response = await asyncRequest<Room>({ data: roomList as Room[] });

  return response as Room[];
});

export const getRom = createAsyncThunk('room/get', async (id: string): Promise<string> => {
  const response = await asyncRequestFake();

  if (!response) throw new Error('Error getting room');
  return id;
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
