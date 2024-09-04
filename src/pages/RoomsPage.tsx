import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ButtonAction, FilterActive } from '../components/shared/GlobalStyle';
import {
  ContainerSection,
  Row,
  TableActions,
  TableStatus,
  Wrapper,
} from '../components/shared/StyledComponets';
import { TableSkeleton } from '../components/shared/skeleton/TableSkeleton';
import TableGuest from '../components/table/TableGuest';
import { deleteRoom, getAllRooms } from '../features/roomsSlice/roomsThunk';
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

  const { setTypeSort, filters } = useRoomFilters();

  const roomsSortered = useMemo(() => roomsSorted(rooms, filters.typeSort), [rooms, filters.typeSort]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteRoom(id));
    //TODO: show a modal to confirm the delete
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

      {loading ? (
        <TableSkeleton />
      ) : (
        <>
          <RoomsSort>
            <FilterActive $active={filters.sortActive === 0} onClick={() => setTypeSort(0)}>
              All Rooms
            </FilterActive>
            <FilterActive $active={filters.sortActive === 1} onClick={() => setTypeSort(1)}>
              Status
            </FilterActive>
            <FilterActive $active={filters.sortActive === 2} onClick={() => setTypeSort(2)}>
              Price
            </FilterActive>

            <ButtonAction to={'/admin/rooms-form'}>New Room +</ButtonAction>
          </RoomsSort>
          <Wrapper>
            <Table columns={columns}>
              {roomsSortered.map((room) => (
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
                  <TableStatus $status={room.status}>{room.status ? 'Disponible' : 'Ocupada'} </TableStatus>
                  <td>
                    <TableActions>
                      <Link to={`/admin/rooms-form/${room._id}`}>
                        <EditIcon className="edit" />
                      </Link>
                      <button onClick={() => handleDelete(room._id)}>
                        <DeleteIcon className="delete" />
                      </button>
                    </TableActions>
                  </td>
                </Row>
              ))}
            </Table>
          </Wrapper>
        </>
      )}
    </ContainerSection>
  );
};

export default RoomsPage;

const RoomsSort = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
