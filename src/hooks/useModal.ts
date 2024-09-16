import { useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    id: '',
  });

  return { modal, setModal };
};
