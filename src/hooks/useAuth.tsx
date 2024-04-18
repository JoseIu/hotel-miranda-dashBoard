import { useContext } from 'react';
import { AuthContext } from '../context/authProvides';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
