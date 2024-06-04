import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import Header from '../components/Header';
import BookingForm from '../components/bookingForm/BookingForm';
import { ContainerDiv } from '../components/shared/GlobalStyle';
import { ContainerSection } from '../components/shared/StyledComponets';
import { BookingInterface } from '../interfaces/booking.interface';

const BookingDeleteAdd = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState<BookingInterface | null>(null);
  const { bookins } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const booking = bookins.find((booking) => booking._id === id);
      if (!booking) return;
      setBookingToEdit(booking);
    }
  }, [id, bookins]);

  return (
    <ContainerSection>
      <Header title={isEditing ? 'Editing' : 'Add Booking'} />
      <ContainerDiv>{isEditing ? <BookingForm booking={bookingToEdit} /> : <BookingForm />}</ContainerDiv>
    </ContainerSection>
  );
};

export default BookingDeleteAdd;
