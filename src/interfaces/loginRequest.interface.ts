export interface LoginRequest {
  error: boolean;
  data: Data;
  message?: string;
}

export interface Data {
  user: UserLogin;
  token: string;
}

export interface UserLogin {
  id: string;
  name: string;
  email: string;
}
