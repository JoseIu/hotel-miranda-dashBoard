import { bookinsDB } from '../features/bookinsSlice/bookinsThunk';
import { Guest } from '../interfaces/guest.interface';

export const getBookingRequest = (id: string): Promise<Guest | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bookinsDB.find((guest) => guest.guest.reservationID === id));
    }, 200);
  });
};

export const addBookingRequest = (guest: Guest) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      bookinsDB.push(guest);
      resolve(true);
    }, 200);
  });
};

export const deleteBookingRequest = (id: string): Promise<boolean> => {
  return new Promise((reolve) => {
    setTimeout(() => {
      bookinsDB.filter((guest) => guest.guest.reservationID !== id);
      reolve(true);
    }, 200);
  });
};

export const updateBookingRequest = (id: string, data: Guest) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const guestIndex = bookinsDB.findIndex((guest) => guest.guest.reservationID === id);

      if (guestIndex === -1) return reject('Guest not found');
      bookinsDB[guestIndex] = data;
      resolve(true);
    }, 200);
  });
};
