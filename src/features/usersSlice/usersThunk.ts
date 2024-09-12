import { createAsyncThunk } from '@reduxjs/toolkit';
import apiFetch from '../../helpers/apiFetch';
import { Employee, EmployeeToSend } from '../../interfaces/employee.interface';

export const getUsers = createAsyncThunk('users/get', async (): Promise<Employee[]> => {
  const response = await apiFetch('employees');

  return response.data as Employee[];
});

export const addNewUser = createAsyncThunk('users/post', async (user: EmployeeToSend): Promise<Employee> => {
  const response = await apiFetch('employee', 'POST', null, user);
  return response.data as Employee;
});
export const updateUser = createAsyncThunk('users/put', async (user: Employee): Promise<Employee> => {
  const response = await apiFetch('employee', 'PUT', user._id, user);
  return response.data as Employee;
});

export const deleteUser = createAsyncThunk('users/delete', async (id: string): Promise<string> => {
  await apiFetch('employee', 'Delete', id);
  return id;
});
