import React, { ReactNode, createContext, useReducer } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  userData: UserAuthState;
  dispatch: React.Dispatch<UserAuthAction>;
}

interface UserAuthState {
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
}

type UserAuthAction =
  | { type: 'SET_AUTH'; payload: { isAuthenticated: boolean; userName: string; userEmail: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: { name: string; email: string } };

export const AuthContext = createContext<AuthContextProps>({
  userData: {
    isAuthenticated: false,
    userName: '',
    userEmail: '',
  },

  dispatch: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const userAuthReducer = (state: UserAuthState, action: UserAuthAction) => {
    switch (action.type) {
      case 'SET_AUTH':
        localStorage.setItem('isAuth', 'true');

        return {
          ...state,
          isAuthenticated: action.payload.isAuthenticated,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        };

      case 'LOGOUT':
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        return { ...state, isAuthenticated: false };
      case 'UPDATE_USER':
        return { ...state, userName: action.payload.name, userEmail: action.payload.email };

      default:
        throw new Error('Invalid action type');
    }
  };
  const [userData, dispatch] = useReducer(userAuthReducer, {
    isAuthenticated: localStorage.getItem('isAuth') !== null,
    userName: 'Pedrito Perez',
    userEmail: 'prueba@prueba.com',
  });

  return <AuthContext.Provider value={{ userData, dispatch }}>{children}</AuthContext.Provider>;
};
