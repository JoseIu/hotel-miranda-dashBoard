import styled from 'styled-components';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <DashboardPage>
      <Header />
      <h2>Dashboard PAGE</h2>
    </DashboardPage>
  );
};

export default Dashboard;

const DashboardPage = styled.section`
  background-color: #171717;
`;
