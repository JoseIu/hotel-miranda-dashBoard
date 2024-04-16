import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(`User ID: ${id}`);
  }, [id]);
  return <div>EACH ROO {id}</div>;
};

export default Room;
