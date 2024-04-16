import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(`User ID: ${id}`);
  }, [id]);

  return <div>EUSER {id}</div>;
};

export default User;
