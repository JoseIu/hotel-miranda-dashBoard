import React, { ReactNode, createContext, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const storedLogin = localStorage.getItem('login');
  // const [login, setLogin] = useState(storedLogin ? true : false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('login') !== null);

  // useEffect(() => {
  //   const loginInStorage = localStorage.getItem('login');
  //   console.log(loginInStorage);
  //   if (loginInStorage) {
  //     setLogin(true);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
  );
};
