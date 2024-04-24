import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { getBooking } from '../features/bookinsSlice/bookinsThunk';

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const distpatch = useDispatch<AppDispatch>();

  const { guest } = useSelector((state: RootState) => state.bookings);

  console.log(guest);
  useEffect(() => {
    if (!id) return;
    distpatch(getBooking(id));
  }, []);
  return <div>{guest.guest.name}</div>;
};

export default BookingDetails;
