import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Table from '../components/Table';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import roomList from '../db/roomList.json';
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
  const [rooms] = useState<Room[]>(roomList as Room[]);
  return (
    <ContainerSection>
      <Header />
      <Wrapper>
        <Table columns={columns}>
          {rooms.map((room) => (
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

const RoomStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;
