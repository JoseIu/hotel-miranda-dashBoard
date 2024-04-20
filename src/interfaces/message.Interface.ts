export interface Message {
  fullName: FullName;
  email: string;
  phone: string;
  description: string;
}

export interface FullName {
  firstName: string;
  lastName: string;
}
