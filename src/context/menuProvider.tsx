import { ReactNode, createContext, useState } from 'react';
interface AuthProviderProps {
  children: ReactNode;
}

interface MenuContextProps {
  isActived: boolean;
  setIsActived: React.Dispatch<React.SetStateAction<boolean>>;
}
export const MenuContext = createContext<MenuContextProps>({
  isActived: false,
  setIsActived: () => {},
});

export const MenuProvider = ({ children }: AuthProviderProps) => {
  const [isActived, setIsActived] = useState(false);
  return <MenuContext.Provider value={{ isActived, setIsActived }}>{children}</MenuContext.Provider>;
};
