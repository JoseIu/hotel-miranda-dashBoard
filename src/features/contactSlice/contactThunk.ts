import { createAsyncThunk } from '@reduxjs/toolkit';
import apiFetch from '../../helpers/apiFetch';
import { Message } from '../../interfaces/contact.Interface';

export const getAllContacts = createAsyncThunk('contacts/get', async (): Promise<Message[]> => {
  const response = await apiFetch('contacts');
  return response.data as Message[];
});

export const deleteContact = createAsyncThunk('contacts/delete', async (id: string): Promise<string> => {
  await apiFetch('contact', 'DELETE', id);
  return id;
});
