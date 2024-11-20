import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import { PaginationTable } from '../components';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ModalDelete } from '../components/modal/ModalDelete';
import { ButtonAction, FilterActive } from '../components/shared/GlobalStyle';
import { ContainerSection, Row, TableActions, TableStatus } from '../components/shared/StyledComponets';
import { TableSkeleton } from '../components/shared/skeleton/TableSkeleton';
import TableGuest from '../components/table/TableGuest';
import { deleteRoom, getAllRooms } from '../features/roomsSlice/roomsThunk';
import { paginationTable } from '../helpers';
import { useTablePagination } from '../hooks';
import { roomsSorted, useRoomFilters } from '../hooks/useRoomsFilters';

const columns = [
  { label: 'Room', key: 'room ' },
  { label: 'Room Type', key: 'room type' },
  { label: 'Amenities ', key: 'amenities ' },
  { label: 'Price ', key: 'price ' },
  { label: 'Offer Price', key: 'offer price' },
  { label: 'Status', key: 'status' },
];
const RoomsPage = () => {
  const [loading, setLoading] = useState(true);
  const { rooms } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();
  const [modal, setModal] = useState({
    isOpen: false,
    id: '',
  });
  const { page, itemsPerPage, setPage } = useTablePagination({ page: 1, itemsPerPage: 8 });

  const { setTypeSort, filters } = useRoomFilters();

  const { roomsSortered, totalPage } = useMemo(() => {
    const roomsSortered = roomsSorted(rooms, filters.typeSort);
    const totalPage = Math.ceil(roomsSortered.length / itemsPerPage);
    return { roomsSortered, totalPage };
  }, [rooms, filters.typeSort, itemsPerPage]);

  const roomsPaginated = paginationTable(roomsSortered, page, itemsPerPage);

  const handleDelete = async () => {
    await dispatch(deleteRoom(modal.id));
    toast.success('Booking deleted successfully');
    setModal({ isOpen: false, id: '' });
  };

  useEffect(() => {
    const getRooms = async () => {
      await dispatch(getAllRooms()).unwrap();
      setLoading(false);
    };
    getRooms();
  }, [dispatch]);

  return (
    <ContainerSection>
      <Header title={'Rooms'} />
      <RoomsSort>
        <div>
          <FilterActive $active={filters.sortActive === 0} onClick={() => setTypeSort(0)}>
            All Rooms
          </FilterActive>
          <FilterActive $active={filters.sortActive === 1} onClick={() => setTypeSort(1)}>
            Status
          </FilterActive>
          <FilterActive $active={filters.sortActive === 2} onClick={() => setTypeSort(2)}>
            Price
          </FilterActive>
        </div>
        <ButtonAction to={'/admin/rooms-form'}>New Room +</ButtonAction>
      </RoomsSort>

      {loading ? (
        <TableSkeleton rows={8} />
      ) : (
        <>
          <Table columns={columns}>
            {roomsPaginated.map((room) => (
              <Row key={room._id}>
                <td>
                  <Link to={`/admin/rooms/${room._id}`}>
                    <TableGuest id={room._id} name={room.roomType} lastName={room.roomNumber} />
                  </Link>
                </td>
                <td>{room.roomType}</td>
                <td> {room.amenities} </td>

                <td>{room.price} </td>

                <td>{room.offerPrice == 0 ? 'No Offer' : room.offerPrice} </td>
                <TableStatus $status={room.status}>{room.status ? 'Available' : 'Occupied'} </TableStatus>
                <td>
                  <TableActions>
                    <Link to={`/admin/rooms-form/${room._id}`}>
                      <EditIcon className="edit" />
                    </Link>
                    <button onClick={() => setModal({ isOpen: true, id: room._id })}>
                      <DeleteIcon className="delete" />
                    </button>
                  </TableActions>
                </td>
              </Row>
            ))}
          </Table>

          <PaginationTable page={page} totalPages={totalPage} setPage={setPage} />

          <ModalDelete isOpen={modal.isOpen} setModal={setModal} handleDelete={handleDelete} />
        </>
      )}
    </ContainerSection>
  );
};

export default RoomsPage;

const RoomsSort = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  div {
    background-color: var(--white-color);
    box-shadow: var(--box-shadow);
    border-radius: 0.3rem;
    border: 0.0625rem solid var(--text-dark);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
`;
