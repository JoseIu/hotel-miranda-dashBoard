import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Table from '../components/Table';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import bookings from '../db/bookins.json';
import { Guest } from '../interfaces/guest.interface';
const columns = [
  { label: 'Guest', key: 'guest' },
  { label: 'Order Date', key: 'orderDate' },
  { label: 'Check In', key: 'checkin' },
  { label: 'Check Out', key: 'checkOut' },
  { label: 'Special Request', key: 'specialRequest' },
  { label: 'Room Type', key: 'roomType' },
  { label: 'Status', key: 'status' },
];

const BookingsPage = () => {
  const [rooms] = useState<Guest[]>(bookings as Guest[]);

  const { bookingFilter, setType, setOrderBy } = useFiltersBookings();
  const roomsFiltered = filterByType(rooms, bookingFilter.type);

  return (
    <ContainerSection>
      <Header title={'Bookings'} />

      <BookingsFilter>
        <div>
          <button onClick={() => setType(0)}>All Bookings</button>
          <button onClick={() => setType(1)}>Checking In</button>
          <button onClick={() => setType(2)}>Checking Out</button>
          <button onClick={() => setType(3)}> In Progress</button>
        </div>

        <select
          name="orderBy"
          id="orderBy"
          value={bookingFilter.orderBy}
          onChange={(e) => setOrderBy(Number(e.target.value))}
        >
          <option value="0">Guest</option>
          <option value="1">Order Date</option>
          <option value="2">Check in</option>
          <option value="3">Check out</option>
        </select>
      </BookingsFilter>
      <Wrapper>
        <Table columns={columns}>
          {roomsFiltered.map((guest) => (
            <Row key={guest.guest.reservationID}>
              <TableGuest
                img={guest.guest.img}
                name={guest.guest.name}
                lastName={guest.guest.lastName}
                id={guest.guest.reservationID}
              />
              <td>{guest.orderDate}</td>
              <td>
                {guest.checkin.date} {guest.checkin.time}
              </td>
              <td>
                {guest.checkOut.date}
                {guest.checkOut.time}
              </td>
              <td>{guest.specialRequest}</td>
              <td>{guest.roomType}</td>
              <TdStatus $status={guest.status}>{guest.status}</TdStatus>
            </Row>
          ))}
        </Table>
      </Wrapper>

      <div>PAGINATION</div>
    </ContainerSection>
  );
};

export default BookingsPage;
const TdStatus = styled.td<{ $status?: 'Check In' | 'Check Out' | 'In Progress' }>`
  color: ${(props) =>
    props.$status === 'Check In' ? '#4CAF50' : props.$status === 'Check Out' ? '#F44336' : '#FFC107'};
`;
const BookingsFilter = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: 1rem;
    padding: 0 0.5rem 1rem 0.5rem;
    border-bottom: 0.0625rem solid #3d3d3d;
    button {
      cursor: pointer;
      &:focus {
        color: #135846;
      }
    }
  }
  select {
    outline: 0.0625rem solid #135846;
    color: #135846;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
`;

const useFiltersBookings = () => {
  const [bookingFilter, setBookingFilter] = useState({
    search: '',
    type: 0,
    orderBy: 1,
  });

  const setSearch = (search: string) => setBookingFilter({ ...bookingFilter, search });

  const setType = (type: number) => setBookingFilter({ ...bookingFilter, type });

  const setOrderBy = (orderBy: number) => setBookingFilter({ ...bookingFilter, orderBy });

  return { bookingFilter, setSearch, setType, setOrderBy };
};

const filterByType = (rooms: Guest[], type: number) => {
  const roomsToFilter = rooms;

  switch (type) {
    case 1:
      return roomsToFilter.filter((room) => room.status.toLowerCase() === 'check in');
    case 2:
      return roomsToFilter.filter((room) => room.status.toLowerCase() === 'check out');

    case 3:
      return roomsToFilter.filter((room) => room.status.toLowerCase() === 'in progress');

    default:
      return roomsToFilter;
  }
};
