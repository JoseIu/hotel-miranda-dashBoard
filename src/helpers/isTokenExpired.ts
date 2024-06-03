import { jwtDecode } from 'jwt-decode';
const token = localStorage.getItem('token');
const isTokenExpired = (): boolean => {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (!decodedToken.exp) {
    return true;
  }

  return decodedToken.exp < currentTime;
};

export default isTokenExpired;
