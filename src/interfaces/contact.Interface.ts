export interface ContactResponse {
  error: boolean;
  data: Message[];
}

export interface Message {
  customer: Customer;
  _id: string;
  date: string;
  messageID: string;
  subject: string;
  comment: string;
  arhived: boolean;
}

export interface Customer {
  email: string;
  name: string;
  phone: string;
}
