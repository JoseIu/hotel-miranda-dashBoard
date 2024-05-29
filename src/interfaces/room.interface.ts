export interface RoomInterfaceRequest {
  error: boolean;
  data: RoomInterface[];
}

export interface RoomInterface {
  _id: string;
  roomImages: string;
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

export enum RoomType {
  DoubleBed = 'Double Bed',
  DoubleSuperior = 'Double Superior',
  SingleBed = 'Single Bed',
  Suite = 'Suite',
}
