export interface EmployeeResponse {
  error: boolean;
  data: Employee[];
}

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  startDate: string;
  phone: string;
  email: string;
  role: Role;
  description: string;
  status: boolean;
}
export interface EmployeeToSend {
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  startDate: string;
  phone: string;
  email: string;
  role: Role;
  description: string;
  status: boolean;
}

export enum Role {
  Manager = 'Manager',
  Receptionist = 'Receptionist',
  RoomServices = 'Room Services',
}
