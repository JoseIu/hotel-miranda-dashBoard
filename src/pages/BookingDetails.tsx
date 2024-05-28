import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { getBooking } from '../features/bookinsSlice/bookinsThunk';
import { getRomById } from '../features/roomsSlice/roomsThunk';

const BookingDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { bookin } = useSelector((state: RootState) => state.bookings);
  const { room } = useSelector((state: RootState) => state.rooms);

  const { id } = useParams<{ id: string }>();
  const distpatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getBookingByID = async () => {
      await distpatch(getBooking(id!));
      setIsLoading(false);
    };
    getBookingByID();
  }, []);

  useEffect(() => {
    const getRoomByID = async () => {
      if (bookin?.roomID) {
        console.log('GOLAAA');
        await distpatch(getRomById(bookin?.roomID));
      }
    };
    getRoomByID();
  }, [bookin?.roomID, distpatch]);
  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <span>{bookin?.guest.name}</span>
      <span>{room?.amenities}</span>
    </section>
  );
};

export default BookingDetails;
