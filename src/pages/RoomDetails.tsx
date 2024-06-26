import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { getRomById } from '../features/roomsSlice/roomsThunk';

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { room } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();

  const getRoomByID = async () => {
    if (!id) return;
    await dispatch(getRomById(id));
    setLoading(false);
  };

  useEffect(() => {
    getRoomByID();
  }, []);

  if (loading || !room) return <span>Loading...</span>;
  return <div>EACH ROO {room._id}</div>;
};

export default RoomDetails;
