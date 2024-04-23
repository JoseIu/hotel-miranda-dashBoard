import { createAsyncThunk } from '@reduxjs/toolkit';
import bookins from '../../db/bookins.json';
import { Guest } from '../../interfaces/guest.interface';

const bookinsDB = bookins as Guest[];

interface AsyncRequest<T> {
  data: T[];
  delay?: number;
}
const asyncRequest = <T>({ data, delay = 200 }: AsyncRequest<T>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

const getBookingRequest = (id: string): Promise<Guest | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bookinsDB.find((guest) => guest.guest.reservationID === id));
    }, 200);
  });
};

// const addBookingRequest = (guest: Guest) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       bookinsDB.push(guest);
//       resolve(true);
//     }, 200);
//   });
// };

// const deleteBookingRequest = (id: string): Promise<boolean> => {
//   return new Promise((reolve) => {
//     setTimeout(() => {
//       bookinsDB.filter((guest) => guest.guest.reservationID !== id);
//       reolve(true);
//     }, 200);
//   });
// };

// const updateBookingRequest = (id: string, data: Guest) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const guestIndex = bookinsDB.findIndex((guest) => guest.guest.reservationID === id);

//       if (guestIndex === -1) return reject('Guest not found');
//       bookinsDB[guestIndex] = data;
//       resolve(true);
//     }, 200);
//   });
// };

export const getAllBookings = createAsyncThunk('bookins/get', async (): Promise<Guest[]> => {
  const response = await asyncRequest<Guest>({ data: bookinsDB });

  return response as Guest[];
});

export const getBooking = createAsyncThunk('booking/get', async (id: string): Promise<Guest> => {
  const response = await getBookingRequest(id);

  return response as Guest;
});

// export const addBooking = createAsyncThunk('booking/add', async (guest: Guest): Promise<Guest> => {
//   const response = await addBookingRequest(guest);
//   if (!response) throw new Error('Error adding booking');
//   return guest;
// });

// export const deleteBooking = createAsyncThunk('booking/delete', async (id: string): Promise<string> => {
//   console.log(id);
//   const response = await deleteBookingRequest(id);
//   if (!response) throw new Error('Error deleting booking');
//   return id;
// });

// export const updateBooking = createAsyncThunk(
//   'booking/update',
//   async (payload: { id: string; data: Guest }) => {
//     const { id, data } = payload;

//     const response = await updateBookingRequest(id, data);

//     if (!response) throw new Error('Error updating booking');
//     return payload;
//   }
// );
