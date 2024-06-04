import { createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../interfaces/employee.interface';
import { addNewUser, deleteUser, getUsers } from './usersThunk';

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

    builder.addCase(addNewUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = 'succeeded';
    });

    builder.addCase(addNewUser.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
  },
});
