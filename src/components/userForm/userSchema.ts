import { z } from 'zod';
export const ROLE = ['Manager', 'Receptionist', 'Room Services'] as const;

export const userSchema = z.object({
  firstName: z.string().min(1, { message: 'Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  startDate: z.string().min(1, { message: 'Start Date is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
  role: z.enum(ROLE),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.boolean(),
});

export type UserSchema = z.infer<typeof userSchema>;
