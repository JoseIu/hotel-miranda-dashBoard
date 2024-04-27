import { createSlice } from '@reduxjs/toolkit';
import { Room } from '../../interfaces/room';
import { getAllRooms, getRom } from './roomsThunk';

interface Bookings {
  rooms: Room[];
  room: Room | null;
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

    builder.addCase(getRom.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getRom.fulfilled, (state, action) => {
      const findRoom = state.rooms.find((room) => room.room.id === action.payload);
      if (!findRoom) return;
      state.room = findRoom;
      state.loading = 'succeeded';
    });
    builder.addCase(getRom.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

// export const { increment } = roomsSlice.actions;
