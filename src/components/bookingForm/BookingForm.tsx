import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookingInterface } from '../../interfaces/booking.interface';
import { RoomType } from '../../interfaces/room.interface';
import { Form, FormSubmmit, SelectOption } from '../shared/GlobalStyle';
import Input from '../shared/input/Input';
import Select from '../shared/select/Select';
import { BookingSchema, bookingShema } from './bookingSchema';
type BookingFormProps = {
  booking?: BookingInterface | null;
};
const BookingForm = ({ booking }: BookingFormProps) => {
  //   const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingShema),
  });

  const onHandleSubmit: SubmitHandler<BookingSchema> = async (data) => {
    console.log('ADDED');
    console.log(data);
    toast.success('Added Successfully!');
    navigate('/admin/bookings');
  };
  const onHandleEdit: SubmitHandler<BookingSchema> = async (data) => {
    console.log(data);
    console.log('EDITED');
  };

  useEffect(() => {
    if (!booking) return;
    console.log(booking);
    setValue('name', booking.guest.name);
    setValue('lastName', booking.guest.lastName);
    setValue('orderDate', booking.orderDate.split('T')[0]);
    setValue('checkin', `${booking.checkin.date.split('T')[0]}T${booking.checkin.time}`);
    setValue('checkOut', `${booking.checkOut.date.split('T')[0]}T${booking.checkOut.time}`);
    setValue('roomType', booking.roomType as RoomType);
    setValue('status', booking.status);
  }, [booking, setValue]);
  return (
    <Form onSubmit={handleSubmit(booking !== null ? onHandleEdit : onHandleSubmit)}>
      <Input
        label="Description"
        error={errors['name']}
        id="name"
        type="text"
        placeholder="Write name"
        {...register('name')}
      />

      <Input
        label="Last Name"
        type="text"
        id="lastName"
        error={errors['lastName']}
        placeholder="lastName"
        {...register('lastName')}
      />
      <Input
        label="Order Date"
        type="date"
        id="price"
        error={errors['orderDate']}
        placeholder="orderDate"
        {...register('orderDate')}
      />
      <Input
        label="CheckIn"
        type="datetime-local"
        id="checkin"
        error={errors['checkin']}
        placeholder="checkin"
        {...register('checkin')}
      />
      <Input
        label="check Out"
        type="datetime-local"
        id="checkOut"
        error={errors['checkOut']}
        placeholder="checkOut"
        {...register('checkOut')}
      />
      <Select label="Room Type" id="roomType" error={errors['roomType']} {...register('roomType')}>
        <SelectOption value="Single Bed">Single Bed</SelectOption>
        <SelectOption value="Double Bed">Double Bed</SelectOption>
        <SelectOption value="Double Superior">Double Superior</SelectOption>
        <SelectOption value="Suite">Suite</SelectOption>
      </Select>

      <FormSubmmit type="submit">{booking ? 'Edit' : 'Add'}</FormSubmmit>
    </Form>
  );
};

export default BookingForm;
