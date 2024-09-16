import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../interfaces/contact.Interface';
import { deleteContact, getAllContacts } from './contactThunk';
interface Contact {
  contacts: Message[];

  contact: Message | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: Contact = {
  contacts: [],
  contact: null,
  loading: 'idle',
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllContacts.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getAllContacts.rejected, (state) => {
      state.loading = 'failed';
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
    });
    builder.addCase(deleteContact.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});
