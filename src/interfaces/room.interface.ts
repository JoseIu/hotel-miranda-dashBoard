export interface RoomInterfaceRequest {
  error: boolean;
  data: RoomInterface[];
}

export interface RoomInterface {
  _id: string;
  roomNumber: string;
  roomType: RoomType;
  description: string;
  offer: boolean;
  offerPrice: number;
  price: number;
  discount: number;
  status: boolean;
  amenities: Amenity[];
}
export interface RoomToSend {
  roomNumber: string;
  roomType: RoomType;
  description: string;
  offer: boolean;
  offerPrice: number;
  price: number;
  discount: number;
  status: boolean;
  amenities: Amenity[];
}

export enum Amenity {
  AirConditioning = 'Air Conditioning',
  CoffeeMaker = 'Coffee Maker',
  Safe = 'Safe',
  Tv = 'TV',
  WiFi = 'WiFi',
}

export type RoomType = 'Double Bed' | 'Double Superior' | 'Single Bed' | 'Suite';
