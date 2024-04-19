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

  return (
    <ContainerSection>
      <Header />
      <Wrapper>
        <Table columns={columns}>
          {rooms.map((guest) => (
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
    </ContainerSection>
  );
};

export default BookingsPage;
const TdStatus = styled.td<{ $status?: 'Check In' | 'Check Out' | 'In Progress' }>`
  color: ${(props) =>
    props.$status === 'Check In' ? '#4CAF50' : props.$status === 'Check Out' ? '#F44336' : '#FFC107'};
`;
