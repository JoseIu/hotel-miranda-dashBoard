import styled from 'styled-components';
import { Status } from '../interfaces/booking.interface';
import { FormInterface } from '../pages/BookingDeleteAdd';

const FormBookingEdit = ({
  form,
  setName,
  setLastName,
  setOrderDate,
  setCheckIn,
  setCheckOut,
  setSpecialRequest,
  setRoomType,
  setStatus,
}: FormInterface) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('EDITANDO');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset $colums={3}>
        <legend>GUEST DATA</legend>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={form.guest.name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label htmlFor="lastName">
          last Name
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={form.guest.lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
      </Fieldset>

      <Fieldset $colums={3}>
        <legend>Date</legend>
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
            value={`${form.checkin.date}T${form.checkin.time}`}
            onChange={(event) => setCheckIn(event.target.value)}
          />
        </label>
        <label htmlFor="checkOut">
          Check Out
          <input
            type="datetime-local"
            name="checkOut"
            id="checkOut"
            value={`${form.checkOut.date}T${form.checkOut.time}`}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </label>
      </Fieldset>
      <Fieldset $colums={2}>
        <legend>Room</legend>

        <label htmlFor="bedType">
          Room Type
          <select
            name="roomType"
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
            onChange={(event) => setStatus(event.target.value as Status)}
          >
            <option value="Check In">Check In</option>
            <option value="Check Out">Check Out</option>
            <option value="In Progress">In Progress</option>
          </select>
        </label>
      </Fieldset>

      <label htmlFor="specialRequest">
        SpecialRequest
        <textarea
          name="specialRequest"
          id="specialRequest"
          cols={30}
          rows={10}
          value={form.specialRequest}
          onChange={(event) => setSpecialRequest(event.target.value)}
        ></textarea>
      </label>

      <button type="submit">Save</button>
    </Form>
  );
};

export default FormBookingEdit;
const Form = styled.form`
  position: relative;
  max-width: 80rem;
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

const Fieldset = styled.fieldset<{ $colums: number }>`
  border: 0.0625rem solid #135846;
  border-radius: 0.4rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(${(props) => props.$colums}, 1fr);
  gap: 2rem;
`;
