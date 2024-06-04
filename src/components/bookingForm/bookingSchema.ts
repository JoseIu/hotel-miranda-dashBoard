import { z } from 'zod';
import { ROOMTYPE } from '../roomForm/roomSchema';

//name, lastName, orderDate, checkinDate, checkOut, roomType,status
const STATUS = ['Check In', 'Check Out', 'In Progress'] as const;
export const bookingShema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  orderDate: z
    .string()
    .min(1, { message: 'Order Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),

  checkin: z
    .string()
    .min(1, { message: 'Checkin Date is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),
  checkOut: z
    .string()
    .min(1, { message: 'Check Out is required' })
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: 'Select a valid date formant',
    }),

  roomType: z.enum(ROOMTYPE),
  status: z.enum(STATUS),
  specialRequest: z.string().min(1, { message: 'Special Request is required' }),
});

export type BookingSchema = z.infer<typeof bookingShema>;
