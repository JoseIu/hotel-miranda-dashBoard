import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import BookingsOrder from '../components/BookingsOrder';
import Header from '../components/Header';
import InputSearh from '../components/InputSearch';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ModalDelete } from '../components/modal/ModalDelete';
import { ButtonAction } from '../components/shared/GlobalStyle';
import {
  BookingStatus,
  ContainerSection,
  Row,
  TableActions,
  Wrapper,
} from '../components/shared/StyledComponets';
import { TableSkeleton } from '../components/shared/skeleton/TableSkeleton';
import TableGuest from '../components/table/TableGuest';
import { deleteBooking, getAllBookings } from '../features/bookinsSlice/bookinsThunk';
import { filterByName, filterByType, orderBy, useBookingsFilters } from '../hooks/useBookingsFilters';
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
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({
    isOpen: false,
    id: '',
  });

  const { bookins } = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch<AppDispatch>();
  //FILTERS
  const { bookingFilter, setType, setOrderBy, setSearch } = useBookingsFilters();

  const bookingsFiltered = useMemo(() => {
    let bookingsFiltered = filterByName(bookins, bookingFilter.search);
    bookingsFiltered = filterByType(bookingsFiltered, bookingFilter.type);
    bookingsFiltered = orderBy(bookingsFiltered, bookingFilter.orderBy);
    return bookingsFiltered;
  }, [bookins, bookingFilter]);
  const handleDelete = async () => {
    console.log(modal.id);
    await dispatch(deleteBooking(modal.id));
    toast.success('Room deleted successfully');
    setModal({ isOpen: false, id: '' });
  };
  useEffect(() => {
    const getBookings = async () => {
      await dispatch(getAllBookings()).unwrap();
      setLoading(false);
    };
    getBookings();
  }, [dispatch]);

  return (
    <ContainerSection>
      <Header title={'Bookings'} />

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <BookingsFilter>
            <BookingsOrder type={bookingFilter.type} setType={setType} />

            <InputSearh
              name="search"
              id="search"
              value={bookingFilter.search}
              placeholder="search a booking...."
              onChange={(event) => setSearch(event.target.value)}
            />
            <ButtonAction to={'/admin/booking-form'}>New Booking +</ButtonAction>
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
                <Row key={booking._id}>
                  <td>
                    <Link to={`/admin/bookings/${booking._id}`}>
                      <TableGuest
                        img={booking.guest.img}
                        name={booking.guest.name}
                        lastName={booking.guest.lastName}
                        id={booking.guest.reservationID}
                      />
                    </Link>
                  </td>
                  <td>{booking.orderDate.slice(0, 10)}</td>
                  <td>
                    {booking.checkin.date.slice(0, 10)} {booking.checkin.time}
                  </td>
                  <td>
                    {booking.checkOut.date.slice(0, 10)}
                    {booking.checkOut.time}
                  </td>
                  <td>{booking.specialRequest}</td>
                  <td>{booking.roomType}</td>
                  <BookingStatus $status={booking.status}>{booking.status}</BookingStatus>
                  <td>
                    <TableActions>
                      <Link to={`/admin/booking-form/${booking._id}`}>
                        <EditIcon className="edit" />
                      </Link>
                      <button onClick={() => setModal({ isOpen: true, id: booking._id })}>
                        <DeleteIcon className="delete" />
                      </button>
                    </TableActions>
                  </td>
                </Row>
              ))}
            </Table>
          </Wrapper>

          <ModalDelete isOpen={modal.isOpen} setModal={setModal} handleDelete={handleDelete} />
        </>
      )}
    </ContainerSection>
  );
};

export default BookingsPage;

const BookingsFilter = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  select {
    outline: 0.0625rem solid var(--zinc-400);
    padding: 0.5rem;
    border-radius: 0.5rem;
    &:focus {
      outline: 0.125rem solid var(--green);
      color: var(--green);
      border-radius: 0.5rem;
    }
  }
`;
