import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { getBooking } from '../features/bookinsSlice/bookinsThunk';

const BookingDetails = () => {
  const { guest, loading } = useSelector((state: RootState) => state.bookings);
  const { id } = useParams<{ id: string }>();
  const distpatch = useDispatch<AppDispatch>();

  useEffect(() => {
    distpatch(getBooking(id!));
  }, [id, distpatch]);

  return (
    <section>{loading === 'pending' ? <p>Loading...</p> : <p>{guest.guest && guest.guest.name}</p>}</section>
  );
};

export default BookingDetails;
