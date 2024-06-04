import { jwtDecode } from 'jwt-decode';
const isTokenExpired = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (!decodedToken.exp) {
    return true;
  }
  return decodedToken.exp < currentTime;
};

export default isTokenExpired;
