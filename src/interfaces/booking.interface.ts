export interface BookingInterface {
  _id: string;
  guest: Guest;
  checkin: Check;
  checkOut: Check;
  orderDate: string;
  roomType: string;
  roomNumber: string;
  roomID: string;
  specialRequest: string;
  status: Status;
}
export interface BookingToSendInterface {
  guest: Guest;
  checkin: Check;
  checkOut: Check;
  orderDate: string;
  roomType: string;
  roomNumber: string;
  roomID: string;
  specialRequest: string;
  status: Status;
}

export interface Check {
  date: string;
  time: string;
}

export interface Guest {
  name: string;
  lastName: string;
  reservationID: string;
  img: string;
}
export type Status = 'Check In' | 'Check Out' | 'In Progress';
