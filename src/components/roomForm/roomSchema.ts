import { z } from 'zod';

export const AMENITY = ['Air Conditioning', 'Coffee Maker', 'Safe', 'TV', 'WiFi'] as const;

// export enum RoomType {
//   DoubleBed = 'Double Bed',
//   DoubleSuperior = 'Double Superior',
//   SingleBed = 'Single Bed',
//   Suite = 'Suite',
// }
export const ROOMTYPE = ['Double Bed', 'Double Superior', 'Single Bed', 'Suite'] as const;

export const roomSchema = z.object({
  roomType: z.enum(ROOMTYPE),
  description: z.string().min(1, { message: 'Description is required' }),
  offer: z.boolean(),
  offerPrice: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), { message: 'OfferPrice price must be a number' }),
  price: z
    .string()
    .min(1, { message: 'Price is required' })
    .refine((value) => !isNaN(parseFloat(value)), { message: 'Offer price must be a number' }),
  discount: z
    .string()
    .min(1, { message: 'Discount is required' })
    .refine((value) => !isNaN(parseFloat(value)), { message: 'Offer price must be a number' }),
  status: z
    .string()
    .refine((value) => value === 'true' || value === 'false', { message: 'Status must be a boolean value' }),
  amenities: z.array(z.string()).min(1, { message: 'At least one amenity is required' }),
});

export type RoomSchema = z.infer<typeof roomSchema>;
