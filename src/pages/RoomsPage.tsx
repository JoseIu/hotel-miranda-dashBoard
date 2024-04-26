import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { getAllRooms } from '../features/roomsSlice/roomsThunk';
import { Room } from '../interfaces/room';

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
  const getRooms = async () => {
    await dispatch(getAllRooms()).unwrap();
    setLoading(false);
  };

  const { setTypeSort, filters } = useFilters();
  console.log(rooms);
  const roomsFiltered = roomsSorted(rooms, filters.typeSort);
  useEffect(() => {
    getRooms();
  }, []);

  if (loading || !rooms.length) {
    return <div>Loading...</div>;
  }
  return (
    <ContainerSection>
      <Header title={'Rooms'} />
      <Wrapper>
        <RoomsSort>
          <SortButtonActive $active={filters.sortActive === 1} onClick={() => setTypeSort(1)}>
            All Rooms
          </SortButtonActive>
          <SortButtonActive $active={filters.sortActive === 2} onClick={() => setTypeSort(2)}>
            Status
          </SortButtonActive>
          <SortButtonActive $active={filters.sortActive === 3} onClick={() => setTypeSort(3)}>
            Price
          </SortButtonActive>
        </RoomsSort>
        <Table columns={columns}>
          {roomsFiltered &&
            roomsFiltered.map((room) => (
              <Row key={room.room.id}>
                <Link to={`/admin/rooms/${room.room.id}`}>
                  <TableGuest
                    img={room.room.image}
                    id={room.room.id}
                    name={room.roomType}
                    lastName={room.room.number}
                  />
                </Link>
                <td>{room.roomType}</td>
                <td> {room.amenities} </td>

                <td>{room.price} </td>

                <td>{room.offer} </td>
                <RoomStatus $status={room.status}>{room.status ? 'Disponible' : 'Ocupada'} </RoomStatus>
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
`;

const RoomStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;

const useFilters = () => {
  const [filters, setFilters] = useState({
    typeSort: 0,
    sortActive: 0,
  });
  const setTypeSort = (typeSort: number) => setFilters({ ...filters, typeSort, sortActive: typeSort });

  return { filters, setTypeSort };
};

const roomsSorted = (rooms: Room[], typeSort: number) => {
  if (!rooms.length) return [...rooms];
  const roomsToSort = [...rooms];

  switch (typeSort) {
    case 1:
      return roomsToSort.sort((a, b) => Number(a.room.number) - Number(b.room.number));
    case 2:
      return roomsToSort.sort((a, b) => {
        if (a.status === b.status) return 0;
        if (a.status && !b.status) return -1;
        return 1;
      });
    case 3:
      return roomsToSort.sort((a, b) => a.price - b.price);
    default:
      return roomsToSort;
  }
};
