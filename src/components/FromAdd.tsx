import { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../app/store';
import { addBooking } from '../features/bookinsSlice/bookinsThunk';
import { getRandomId } from '../helpers/getRandomId';
interface FromAddProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const FromAdd = ({ modalIsOpen, setModalIsOpen }: FromAddProps) => {
  const dispatch = useDispatch<AppDispatch>();
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
  } = useForm();
  console.log(form);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(form).some((value) => value === '')) return alert('Please fill all the fields');
    const checkInFormat = form.checkIn;
    const [dateIn, timeIn] = checkInFormat.split('T');
    const checkOutFormat = form.checkIn;
    const [dateOut, timeOut] = checkOutFormat.split('T');
    const newBooking = {
      orderDate: form.orderDate,
      checkin: {
        date: dateIn,
        time: timeIn,
      },
      checkOut: {
        date: dateOut,
        time: timeOut,
      },
      specialRequest: form.specialRequest,
      roomType: form.roomType,
      status: form.status,
      guest: {
        name: form.name,
        lastName: form.lastName,
        reservationID: getRandomId(),
        img: form.image,
      },
    };

    console.log(newBooking);
    dispatch(addBooking(newBooking));
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <FormContainert $modalIsOpen={modalIsOpen}>
      <Form onSubmit={handleSubmit}>
        <GuestData>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label htmlFor="lastName">
            last Name
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={form.lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </GuestData>

        <CheckDATA>
          <label htmlFor="orderDate">
            Order Date
            <input
              type="date"
              name="orderDate"
              id="orderDate"
              value={form.orderDate}
              onChange={(event) => setOrderDate(event.target.value)}
            />
          </label>

          <label htmlFor="checkinDate">
            Checkin Date
            <input
              type="datetime-local"
              name="checkinDate"
              id="checkinDate"
              value={form.checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </label>
          <label htmlFor="checkOut">
            Check Out
            <input
              type="datetime-local"
              name="checkOut"
              id="checkOut"
              value={form.checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </label>
        </CheckDATA>

        <Select>
          <label htmlFor="bedType">
            Bed Type
            <select
              name="bedType"
              id="bedType"
              value={form.roomType}
              onChange={(event) => setRoomType(event.target.value)}
            >
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Double Superior">Double Superior</option>
              <option value="Suite">Suite</option>
            </select>
          </label>

          <label htmlFor="status">
            Status
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Check In">Check In</option>
              <option value="Check Out">Check Out</option>
              <option value="In Progress">In Progress</option>
            </select>
          </label>
        </Select>

        <textarea
          name="specialRequest"
          id="specialRequest"
          cols={30}
          rows={10}
          value={form.specialRequest}
          onChange={(event) => setSpecialRequest(event.target.value)}
        ></textarea>

        <button type="submit">Add new Bookin</button>

        <ButtonCloseModal type="button" onClick={() => setModalIsOpen(!modalIsOpen)}>
          X
        </ButtonCloseModal>
      </Form>
    </FormContainert>
  );
};

export default FromAdd;

const useForm = () => {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    orderDate: '',
    image: '/images/user2.webp',
    checkIn: '',
    checkOut: '',
    roomType: '',
    specialRequest: '',
    status: '',
  });

  const setName = (name: string) => setForm({ ...form, name });

  const setLastName = (lastName: string) => setForm({ ...form, lastName });

  const setOrderDate = (orderDate: string) => setForm({ ...form, orderDate });
  const setCheckIn = (checkIn: string) => setForm({ ...form, checkIn });

  const setCheckOut = (checkOut: string) => setForm({ ...form, checkOut });

  const setRoomType = (roomType: string) => setForm({ ...form, roomType });

  const setSpecialRequest = (specialRequest: string) => setForm({ ...form, specialRequest });

  const setStatus = (status: string) => setForm({ ...form, status });

  return {
    form,
    setName,
    setLastName,
    setOrderDate,
    setCheckIn,
    setCheckOut,
    setRoomType,
    setSpecialRequest,
    setStatus,
  };
};
const FormContainert = styled.div<{ $modalIsOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #050505e1;
  transition: all 0.3s ease;
  transform: scale(${(props) => (props.$modalIsOpen ? '1' : '0')});

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  position: relative;
  max-width: 50rem;
  padding: 2rem;
  border: 0.0625rem solid #135846;
  border-radius: 0.4rem;
  background-color: #222;

  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  input,
  select,
  textarea {
    border: 0.0625rem solid #135846;
    padding: 0.3rem 0.5rem;
    border-radius: 0.4rem;
  }
  label {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #135846;
    color: #fff;
    border-radius: 0.4rem;
    cursor: pointer;
  }
`;

const GuestData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const CheckDATA = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const Select = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  option {
    background-color: #222;
  }
`;
const ButtonCloseModal = styled.button`
  position: absolute;
  top: -1rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50% !important;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
