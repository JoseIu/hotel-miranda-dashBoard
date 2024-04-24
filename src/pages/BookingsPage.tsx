import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import BookingsOrder from '../components/BookingsOrder';
import Header from '../components/Header';
import InputSearh from '../components/InputSearch';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { deleteBooking, getAllBookings } from '../features/bookinsSlice/bookinsThunk';
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
  const { guests } = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch<AppDispatch>();

  //FILTERS
  const { bookingFilter, setType, setOrderBy, setSearch } = useFiltersBookings();

  let bookingsFiltered = filterByType(guests, bookingFilter.type);
  bookingsFiltered = filterByName(bookingsFiltered, bookingFilter.search);
  bookingsFiltered = orderBy(bookingsFiltered, bookingFilter.orderBy);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <ContainerSection>
      <Header title={'Bookings'} />

      <BookingsFilter>
        <BookingsOrder setType={setType} />

        <InputSearh
          name="search"
          id="search"
          value={bookingFilter.search}
          placeholder="search a booking...."
          onChange={(event) => setSearch(event.target.value)}
        />

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
          {bookingsFiltered.map((booking) => (
            <Row key={booking.guest.reservationID}>
              <Link to={`/admin/bookings/${booking.guest.reservationID}`}>
                <TableGuest
                  img={booking.guest.img}
                  name={booking.guest.name}
                  lastName={booking.guest.lastName}
                  id={booking.guest.reservationID}
                />
              </Link>
              <td>{booking.orderDate}</td>
              <td>
                {booking.checkin.date} {booking.checkin.time}
              </td>
              <td>
                {booking.checkOut.date}
                {booking.checkOut.time}
              </td>
              <td>{booking.specialRequest}</td>
              <td>{booking.roomType}</td>
              <TdStatus $status={booking.status}>{booking.status}</TdStatus>
              <td>
                <button onClick={() => dispatch(deleteBooking(booking.guest.reservationID))}>
                  <DeleteIcon />
                </button>
              </td>
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

const filterByType = (bookings: Guest[], type: number) => {
  const roomsToFilter = [...bookings].sort(
    (a, b) => new Date(a.checkin.date).getTime() - new Date(b.checkin.date).getTime()
  );

  switch (type) {
    case 1:
      return roomsToFilter.filter((booking) => booking.status.toLowerCase() === 'check in');
    case 2:
      return roomsToFilter.filter((booking) => booking.status.toLowerCase() === 'check out');
    case 3:
      return roomsToFilter.filter((booking) => booking.status.toLowerCase() === 'in progress');

    default:
      return roomsToFilter;
  }
};

const filterByName = (bookings: Guest[], search: string) => {
  if (!search) return [...bookings];
  const serachNormalized = search.toLowerCase();

  return bookings.filter((booking) => booking.guest.name.toLowerCase().includes(serachNormalized));
};

const orderBy = (bookings: Guest[], orderBy: number) => {
  const bookingsToOrder = [...bookings];

  switch (orderBy) {
    case 1:
      return bookingsToOrder.sort((a, b) => (a.guest.name < b.guest.name ? -1 : 1));

    case 3:
      return bookingsToOrder.sort(
        (a, b) => new Date(a.checkin.date).getTime() - new Date(b.checkin.date).getTime()
      );
    case 4:
      return bookingsToOrder.sort(
        (a, b) => new Date(a.checkOut.date).getTime() - new Date(b.checkOut.date).getTime()
      );
    default:
      return bookingsToOrder.sort(
        (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
  }
};
