import { useState } from 'react';
import { RoomInterface } from '../interfaces/room.interface';

export const useRoomFilters = () => {
  const [filters, setFilters] = useState({
    typeSort: 0,
    sortActive: 0,
  });
  const setTypeSort = (typeSort: number) => setFilters({ ...filters, typeSort, sortActive: typeSort });

  return { filters, setTypeSort };
};

export const roomsSorted = (rooms: RoomInterface[], typeSort: number) => {
  const roomsToSort = [...rooms];

  switch (typeSort) {
    case 0:
      return roomsToSort.sort((a, b) => Number(a.roomNumber) - Number(b.roomNumber));
    case 1:
      return roomsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status && !b.status) return -1;
        return 1;
      });
    case 2:
      return roomsToSort.sort((a, b) => a.price - b.price);
    default:
      return roomsToSort;
  }
};
