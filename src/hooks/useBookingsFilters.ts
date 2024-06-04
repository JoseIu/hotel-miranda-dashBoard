import { useState } from 'react';
import { BookingInterface } from '../interfaces/booking.interface';

export const useBookingsFilters = () => {
  const [bookingFilter, setBookingFilter] = useState({
    search: '',
    type: 0,
    orderBy: 1,
  });

  const setSearch = (search: string) => setBookingFilter({ ...bookingFilter, search });

  const setType = (type: number) => setBookingFilter({ ...bookingFilter, type });

  const setOrderBy = (orderBy: number) => setBookingFilter({ ...bookingFilter, orderBy });

  return { bookingFilter, setSearch, setType, setOrderBy };
};

export const filterByType = (bookings: BookingInterface[], type: number) => {
  const roomsToFilter = [...bookings];

  switch (type) {
    case 1:
      return roomsToFilter
        .filter((booking) => booking.status.toLowerCase() === 'check in')
        .sort((a, b) => new Date(a.checkin.date).getTime() - new Date(b.checkin.date).getTime());
    case 2:
      return roomsToFilter
        .filter((booking) => booking.status.toLowerCase() === 'check out')
        .sort((a, b) => new Date(a.checkin.date).getTime() - new Date(b.checkin.date).getTime());
    case 3:
      return roomsToFilter
        .filter((booking) => booking.status.toLowerCase() === 'in progress')
        .sort((a, b) => new Date(a.checkin.date).getTime() - new Date(b.checkin.date).getTime());

    default:
      return roomsToFilter;
  }
};

export const filterByName = (bookings: BookingInterface[], search: string) => {
  if (!search) return [...bookings];
  const serachNormalized = search.toLowerCase();

  return bookings.filter((booking) => booking.guest.name.toLowerCase().includes(serachNormalized));
};

export const orderBy = (bookings: BookingInterface[], orderBy: number) => {
  const bookingsToSort = [...bookings];
  switch (orderBy) {
    case 0:
      return bookingsToSort.sort((a, b) => (a.guest.name < b.guest.name ? -1 : 1));
    case 1:
      return bookingsToSort.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
    case 2:
      return bookingsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === 'Check In') return -1;
        if (a.status === 'Check Out' && b.status === 'In Progress') return -1;
        return 0;
      });
    case 3:
      return bookingsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status === 'Check Out') return -1;
        if (a.status === 'Check In' && b.status === 'In Progress') return -1;
        return 0;
      });
    default:
      return bookingsToSort;
  }
};
