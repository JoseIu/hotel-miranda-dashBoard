import { useState } from 'react';
import { Employee } from '../interfaces/employee.interface';

export const useUsersFilters = () => {
  const [userFilter, setUserFilter] = useState({
    type: 0,
    search: '',
  });

  const setType = (type: number) => setUserFilter({ ...userFilter, type });

  const setSearch = (search: string) => setUserFilter({ ...userFilter, search });

  return { userFilter, setType, setSearch };
};
export const filterByName = (users: Employee[], search: string) => {
  if (!search) return [...users];
  const searchNormalized = search.toLowerCase();

  return users.filter((users) => users.firstName.toLowerCase().includes(searchNormalized));
};

export const filterByType = (users: Employee[], type: number) => {
  const usersToFiler = [...users];
  switch (type) {
    case 0:
      return usersToFiler;
    case 1:
      return usersToFiler.filter((user) => user.status === true);
    case 2:
      return usersToFiler.filter((user) => user.status === false);
    default:
      return usersToFiler;
  }
};
