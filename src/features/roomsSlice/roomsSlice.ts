import { createSlice } from '@reduxjs/toolkit';
import { RoomInterface } from '../../interfaces/room.interface';
import { deleteRoom, getAllRooms, getRomById } from './roomsThunk';

interface Bookings {
  rooms: RoomInterface[];
  room: RoomInterface | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState: Bookings = {
  rooms: [],
  room: null,
  loading: 'idle',
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllRooms.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getAllRooms.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(getRomById.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getRomById.fulfilled, (state, action) => {
      state.room = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getRomById.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deleteRoom.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      state.loading = 'succeeded';
    });
    builder.addCase(deleteRoom.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});
