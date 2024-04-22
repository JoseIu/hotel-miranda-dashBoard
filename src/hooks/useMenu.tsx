import { useContext } from 'react';
import { MenuContext } from '../context/menuProvider';

const useMenu = () => {
  return useContext(MenuContext);
};

export default useMenu;
