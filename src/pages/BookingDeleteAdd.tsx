import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import FormBookingEdit from '../components/FormBookingEdit';
import FromAdd from '../components/FromAdd';
import Header from '../components/Header';
import { ContainerSection } from '../components/shared/StyledComponets';
import { BookingInterface, Status } from '../interfaces/booking.interface';

const BookingDeleteAdd = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const { bookins } = useSelector((state: RootState) => state.bookings);

  const {
    form,
    setName,
    setLastName,
    setOrderDate,
    setCheckIn,
    setCheckOut,
    setRoomType,
    setStatus,
    setSpecialRequest,
    setFormValues,
  } = useForm();
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const booking = bookins.find((booking) => booking._id === id);
      console.log(booking);
      if (!booking) return;
      setFormValues(booking);
    }
  }, []);

  return (
    <ContainerSection>
      <Header title={isEditing ? 'Editing' : 'Add Booking'} />

      {isEditing ? (
        <FormBookingEdit
          form={form}
          setName={setName}
          setLastName={setLastName}
          setOrderDate={setOrderDate}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setRoomType={setRoomType}
          setStatus={setStatus}
          setSpecialRequest={setSpecialRequest}
        />
      ) : (
        <FromAdd
          form={form}
          setName={setName}
          setLastName={setLastName}
          setOrderDate={setOrderDate}
          setCheckIn={setCheckIn}
          setCheckOut={setCheckOut}
          setRoomType={setRoomType}
          setStatus={setStatus}
          setSpecialRequest={setSpecialRequest}
        ></FromAdd>
      )}
    </ContainerSection>
  );
};

export default BookingDeleteAdd;

export interface FormInterface {
  form: BookingInterface;
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
  setIamge?: (image: string) => void;
  setOrderDate: (orderDate: string) => void;
  setCheckIn: (checkIn: string) => void;
  setCheckOut: (checkOut: string) => void;
  setRoomType: (roomType: string) => void;
  setSpecialRequest: (specialRequest: string) => void;
  setStatus: (status: Status) => void;
}

const useForm = () => {
  const [form, setForm] = useState<BookingInterface>({
    _id: '',
    guest: {
      name: '',
      lastName: '',
      reservationID: '',
      img: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/664.jpg',
    },
    checkin: {
      date: '',
      time: '',
    },
    checkOut: {
      date: '',
      time: '',
    },
    orderDate: '',
    roomType: '',
    roomNumber: 'Single Bed',
    roomID: '',
    specialRequest: '',
    status: 'Check In',
  });

  const setName = (name: string) => setForm({ ...form, guest: { ...form.guest, name } });

  const setLastName = (lastName: string) => setForm({ ...form, guest: { ...form.guest, lastName } });
  const setIamge = (img: string) => setForm({ ...form, guest: { ...form.guest, img } });

  const setOrderDate = (orderDate: string) => setForm({ ...form, orderDate });

  const setCheckIn = (checkIn: string) => {
    const checkInFormat = checkIn;
    const [dateIn, timeIn] = checkInFormat.split('T');
    setForm({ ...form, checkin: { date: dateIn, time: timeIn } });
  };

  const setCheckOut = (checkOut: string) => {
    const checkInFormat = checkOut;
    const [dateIn, timeIn] = checkInFormat.split('T');
    setForm({ ...form, checkOut: { date: dateIn, time: timeIn } });
  };

  const setRoomType = (roomType: string) => setForm({ ...form, roomType });

  const setSpecialRequest = (specialRequest: string) => setForm({ ...form, specialRequest });

  const setStatus = (status: Status) => setForm({ ...form, status });

  const setFormValues = (newForm: BookingInterface) => {
    const { checkin, checkOut } = newForm;
    const checkInFormat = checkin.date.slice(0, 10);
    const checkOutFormat = checkOut.date.slice(0, 10);
    setForm({
      ...newForm,
      checkin: { date: checkInFormat, time: checkin.time },
      checkOut: { date: checkOutFormat, time: checkOut.time },
    });
  };

  return {
    form,
    setName,
    setLastName,
    setIamge,
    setOrderDate,
    setCheckIn,
    setCheckOut,
    setRoomType,
    setSpecialRequest,
    setStatus,
    setFormValues,
  };
};
