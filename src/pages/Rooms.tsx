import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const Rooms = () => {
  return (
    <ContainerSection>
      <Header />
      <h2>Rooms</h2>
      <Link to={`/rooms/${1}`}>EACH ROOM</Link>
    </ContainerSection>
  );
};

export default Rooms;

const ContainerSection = styled.section`
  background-color: #171717;
`;
