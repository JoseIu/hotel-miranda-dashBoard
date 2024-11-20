import styled from 'styled-components';
import { FilterActive } from './shared/GlobalStyle';

interface BookingsOrderProps {
  setType: (type: number) => void;
  type: number;
}

const BookingsOrder = ({ type, setType }: BookingsOrderProps) => {
  return (
    <BookingOrderContainer>
      <FilterActive $active={type === 0} onClick={() => setType(0)}>
        All Bookings
      </FilterActive>
      <FilterActive $active={type === 1} onClick={() => setType(1)}>
        Checking In
      </FilterActive>
      <FilterActive $active={type === 2} onClick={() => setType(2)}>
        Checking Out
      </FilterActive>
      <FilterActive $active={type === 3} onClick={() => setType(3)}>
        In Progress
      </FilterActive>
    </BookingOrderContainer>
  );
};

export default BookingsOrder;

const BookingOrderContainer = styled.div`
  background-color: var(--white-color);
  border-radius: 0.3rem;
  box-shadow: var(--box-shadow);
  border: 0.0625rem solid var(--text-dark);

  display: flex;
  overflow: hidden;
`;
