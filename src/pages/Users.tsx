import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';

const Users = () => {
  return (
    <ContainerSection>
      <Header />
      <h2>Users</h2>

      <Link to={`/users/${1}`}>EACH USER</Link>
    </ContainerSection>
  );
};

export default Users;
const ContainerSection = styled.section`
  background-color: #171717;
`;
