import { createAsyncThunk } from '@reduxjs/toolkit';
import employedLÑist from '../../db/employeeList.json';
import { asyncRequest } from '../../helpers/asyncRequest';
import { Employee } from '../../interfaces/employee.interface';

export const getUsers = createAsyncThunk('users/getUsers', async (): Promise<Employee[]> => {
  const response = await asyncRequest<Employee>({ data: employedLÑist });

  return response as Employee[];
});
