import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { addBooking, updateBooking } from '../../features/bookinsSlice/bookinsThunk';
import { getRandomId } from '../../helpers/getRandomId';
import { BookingInterface, BookingToSendInterface, Status } from '../../interfaces/booking.interface';
import { RoomType } from '../../interfaces/room.interface';
import { Form, FormSubmmit, SelectOption } from '../shared/GlobalStyle';
import { FormRow } from '../shared/StyledComponets';
import Input from '../shared/input/Input';
import Select from '../shared/select/Select';
import { BookingSchema, bookingShema } from './bookingSchema';

type BookingFormProps = {
  booking?: BookingInterface | null;
};
const BookingForm = ({ booking }: BookingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
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
    const bookingToSend: BookingToSendInterface = {
      guest: {
        name: data.name,
        lastName: data.lastName,
        reservationID: getRandomId(),
        img: 'https://loremflickr.com/cache/resized/65535_53040718893_00db18560c_b_640_480_nofilter.jpg',
      },
      orderDate: data.orderDate,
      checkin: {
        date: data.checkin.split('T')[0],
        time: data.checkin.split('T')[1],
      },
      checkOut: {
        date: data.checkOut.split('T')[0],
        time: data.checkOut.split('T')[1],
      },
      roomType: data.roomType as RoomType,
      roomNumber: getRandomId(),
      roomID: '6655ff57f926766f49be6ce4',
      specialRequest: data.specialRequest,
      status: data.status as Status,
    };
    await dispatch(addBooking(bookingToSend));

    toast.success('Booking added successfully');

    navigate('/admin/bookings');
  };
  const onHandleEdit: SubmitHandler<BookingSchema> = async (data) => {
    const bookingToEdit: BookingInterface = {
      _id: booking!._id,
      guest: {
        name: data.name,
        lastName: data.lastName,
        reservationID: booking!.guest.reservationID,
        img: booking!.guest.img,
      },
      orderDate: data.orderDate,
      checkin: {
        date: data.checkin.split('T')[0],
        time: data.checkin.split('T')[1],
      },
      checkOut: {
        date: data.checkOut.split('T')[0],
        time: data.checkOut.split('T')[1],
      },
      roomType: data.roomType as RoomType,
      roomNumber: booking!.roomNumber,
      roomID: booking!.roomID,
      specialRequest: data.specialRequest,
      status: data.status as Status,
    };
    await dispatch(updateBooking(bookingToEdit));

    toast.success('Booking updated successfully');
    navigate('/admin/bookings');
  };

  useEffect(() => {
    if (!booking) return;
    setValue('name', booking.guest.name);
    setValue('lastName', booking.guest.lastName);
    setValue('orderDate', booking.orderDate.split('T')[0]);
    setValue('checkin', `${booking.checkin.date.split('T')[0]}T${booking.checkin.time}`);
    setValue('checkOut', `${booking.checkOut.date.split('T')[0]}T${booking.checkOut.time}`);
    setValue('roomType', booking.roomType as RoomType);
    setValue('status', booking.status);
    setValue('specialRequest', booking.specialRequest);
  }, [booking, setValue]);
  return (
    <Form onSubmit={handleSubmit(booking !== undefined ? onHandleEdit : onHandleSubmit)}>
      <FormRow>
        <Input
          label="Name"
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
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
        <Select label="Room Type" id="roomType" error={errors['roomType']} {...register('roomType')}>
          <SelectOption value="Single Bed">Single Bed</SelectOption>
          <SelectOption value="Double Bed">Double Bed</SelectOption>
          <SelectOption value="Double Superior">Double Superior</SelectOption>
          <SelectOption value="Suite">Suite</SelectOption>
        </Select>
        <Select label="Status" id="roomType" error={errors['status']} {...register('status')}>
          <SelectOption value="Check In">Check In</SelectOption>
          <SelectOption value="Check Out">Check Out</SelectOption>
          <SelectOption value="In Progress">In Progressr</SelectOption>
        </Select>
      </FormRow>
      <Input
        label="Special Request"
        type="text"
        id="specialRequest"
        error={errors['specialRequest']}
        placeholder="specialRequest"
        {...register('specialRequest')}
      />
      <FormSubmmit type="submit">{booking ? 'Edit' : 'Add'}</FormSubmmit>
    </Form>
  );
};

export default BookingForm;
