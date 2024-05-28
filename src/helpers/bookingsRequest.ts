import { bookinsDB } from '../features/bookinsSlice/bookinsThunk';
import { BookingInterface } from '../interfaces/booking.interface';

export const getBookingRequest = (id: string): Promise<BookingInterface | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('getBookingRequest');
      resolve(bookinsDB.find((guest) => guest.guest.reservationID === id));
    }, 200);
  });
};

export const deleteBookingRequest = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      bookinsDB.filter((guest) => guest.guest.reservationID !== id);
      resolve(true);
    }, 200);
  });
};

export const updateBookingRequest = (id: string, data: BookingInterface) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const guestIndex = bookinsDB.findIndex((guest) => guest.guest.reservationID === id);

      if (guestIndex === -1) return reject('Guest not found');
      bookinsDB[guestIndex] = data;
      resolve(true);
    }, 200);
  });
};
