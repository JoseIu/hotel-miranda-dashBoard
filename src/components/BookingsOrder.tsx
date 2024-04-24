import styled from 'styled-components';

interface BookingsOrderProps {
  setType: (type: number) => void;
}

const BookingsOrder = ({ setType }: BookingsOrderProps) => {
  return (
    <BookingOrderContainer>
      <button onClick={() => setType(0)}>All Bookings</button>
      <button onClick={() => setType(1)}>Checking In</button>
      <button onClick={() => setType(2)}>Checking Out</button>
      <button onClick={() => setType(3)}> In Progress</button>
    </BookingOrderContainer>
  );
};

export default BookingsOrder;

const BookingOrderContainer = styled.div`
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
`;
