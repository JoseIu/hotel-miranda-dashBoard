import { createAsyncThunk } from '@reduxjs/toolkit';
import employeeList from '../../db/employeeList.json';
import { asyncRequest } from '../../helpers/asyncRequest';
import { Employee } from '../../interfaces/employee.interface';

export const getUsers = createAsyncThunk('users/getUsers', async (): Promise<Employee[]> => {
  const response = await asyncRequest<Employee>({ data: employeeList as Employee[] });

  return response as Employee[];
});
