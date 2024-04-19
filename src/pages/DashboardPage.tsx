import styled from 'styled-components';
import Header from '../components/Header';

const DashboardPage = () => {
  return (
    <Container>
      <Header title={'Dashboard'} />
      <h2>Dashboard PAGE</h2>
    </Container>
  );
};

export default DashboardPage;

const Container = styled.section`
  background-color: #171717;
`;
