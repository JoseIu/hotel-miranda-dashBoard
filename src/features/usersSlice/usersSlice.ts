import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../interfaces/employee.interface';
import { getUsers } from './usersThunk';

interface Bookings {
  users: Employee[];
  user: Employee | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
const initialState: Bookings = {
  users: [],
  user: null,
  loading: 'idle',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = 'succeeded';
    });

    builder.addCase(getUsers.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});
