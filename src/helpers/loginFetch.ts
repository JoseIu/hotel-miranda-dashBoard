import { LoginRequest } from '../interfaces/loginRequest.interface';

const loginFetch = async (email: string, password: string): Promise<LoginRequest> => {
  const BASE_URL = import.meta.env.VITE_BACK_URL;
  console.log(BASE_URL);
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data: LoginRequest = await response.json();
  if (data.data.token) localStorage.setItem('token', data.data.token);
  return data as LoginRequest;
};

export default loginFetch;
