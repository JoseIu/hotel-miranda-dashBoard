import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { deleteRoom, getAllRooms } from '../features/roomsSlice/roomsThunk';
import { RoomInterface } from '../interfaces/room.interface';

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

  const { setTypeSort, filters } = useFilters();
  const roomsFiltered = roomsSorted(rooms, filters.typeSort);
  const handleDelete = async (id: string) => {
    await dispatch(deleteRoom(id));
    toast.success('Deleted Successfully!');
  };

  useEffect(() => {
    const getRooms = async () => {
      await dispatch(getAllRooms()).unwrap();
      setLoading(false);
    };
    getRooms();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ContainerSection>
      <Header title={'Rooms'} />
      <Wrapper>
        <RoomsSort>
          <SortButtonActive $active={filters.sortActive === 0} onClick={() => setTypeSort(0)}>
            All Rooms
          </SortButtonActive>
          <SortButtonActive $active={filters.sortActive === 1} onClick={() => setTypeSort(1)}>
            Status
          </SortButtonActive>
          <SortButtonActive $active={filters.sortActive === 2} onClick={() => setTypeSort(2)}>
            Price
          </SortButtonActive>

          <Link to={'/admin/rooms-form'}>ADD</Link>
        </RoomsSort>
        <Table columns={columns}>
          {roomsFiltered.map((room) => (
            <Row key={room._id}>
              <td>
                <Link to={`/admin/rooms/${room._id}`}>
                  <TableGuest
                    img={room.roomImages}
                    id={room._id}
                    name={room.roomType}
                    lastName={room.roomNumber}
                  />
                </Link>
              </td>
              <td>{room.roomType}</td>
              <td> {room.amenities} </td>

              <td>{room.price} </td>

              <td>{room.offerPrice == 0 ? 'No Offer' : room.offerPrice} </td>
              <RoomStatus $status={room.status}>{room.status ? 'Disponible' : 'Ocupada'} </RoomStatus>
              <td>
                <Actions>
                  <Link to={`/admin/rooms-form/${room._id}`}>
                    <EditIcon className="edit" />
                  </Link>
                  <button onClick={() => handleDelete(room._id)}>
                    <DeleteIcon className="delete" />
                  </button>
                </Actions>
              </td>
            </Row>
          ))}
        </Table>
      </Wrapper>
    </ContainerSection>
  );
};

export default RoomsPage;

const RoomsSort = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const SortButtonActive = styled.button<{ $active: boolean }>`
  color: ${(props) => (props.$active ? '#135846' : '#fff')};
  cursor: pointer;
`;

const RoomStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .edit,
  .delete {
    width: 1.5rem;
  }
  .edit {
    color: #bebeff;
  }
  .delete {
    color: #ff0000;
  }
`;

const useFilters = () => {
  const [filters, setFilters] = useState({
    typeSort: 0,
    sortActive: 0,
  });
  const setTypeSort = (typeSort: number) => setFilters({ ...filters, typeSort, sortActive: typeSort });

  return { filters, setTypeSort };
};

const roomsSorted = (rooms: RoomInterface[], typeSort: number) => {
  const roomsToSort = [...rooms];

  switch (typeSort) {
    case 0:
      return roomsToSort.sort((a, b) => Number(a.roomNumber) - Number(b.roomNumber));
    case 1:
      return roomsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status && !b.status) return -1;
        return 1;
      });
    case 2:
      return roomsToSort.sort((a, b) => a.price - b.price);
    default:
      return roomsToSort;
  }
};
