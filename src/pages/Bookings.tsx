import styled from 'styled-components';
import Header from '../components/Header';

const Bookings = () => {
  return (
    <ContainerSection>
      <Header />
      <h2>Bookings</h2>
    </ContainerSection>
  );
};

export default Bookings;

const ContainerSection = styled.section`
  background-color: #171717;
`;
