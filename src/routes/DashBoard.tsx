import { NavLink, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import UserProfile from '../components/UserProfile';
import useAuth from '../hooks/useAuth';
import useMenu from '../hooks/useMenu';
import { routes } from './routes';

const DashBoard = () => {
  const { userData } = useAuth();
  const { isActived } = useMenu();

  if (!userData.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <MainLayout $isActived={isActived}>
      <Aside>
        <Logo isActived={isActived} />
        <nav>
          <AsideUl>
            {routes.map(({ to, name, Icon }) => (
              <li key={to}>
                <StyledNavLink className={({ isActive }) => (isActive ? 'active' : '')} to={to}>
                  {Icon && <Icon className="icon" />}
                  {name}
                </StyledNavLink>
              </li>
            ))}
          </AsideUl>
        </nav>
        <UserProfile />
        <CopyRight $isActived={isActived}>
          <span>Travl Hotel Admin Dashboard</span>
          <span>© 2020 All Rights Reserved</span>
        </CopyRight>
      </Aside>
      <Outlet />
    </MainLayout>
  );
};

export default DashBoard;

const Aside = styled.aside`
  padding: 1rem 2rem;
  background-color: #202020;
  color: #686868;

  box-shadow: 0.8125rem 0.1875rem 5rem #0000006e;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MainLayout = styled.main<{ $isActived: boolean }>`
  display: grid;
  transition: all 0.3s ease;
  grid: ${(props) => (props.$isActived ? '1fr / 94px calc(100% - 94px)' : '1fr / 280px calc(100% - 280px)')};

  height: 100dvh;
  overflow: hidden;
`;

const AsideUl = styled.ul`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  height: 100%;

  gap: 1rem;
  li {
    padding: 0.8rem 0;
  }
  .icon {
    width: 2rem;
    color: #686868;
  }
`;
const StyledNavLink = styled(NavLink)`
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  gap: 0.3rem;

  transition: all 0.3s ease;

  &.active {
    color: red;
    .icon {
      color: red;
    }
  }
`;

const CopyRight = styled.div<{ $isActived: boolean }>`
  display: ${(props) => (props.$isActived ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  span {
    font-size: 0.8rem;
  }
`;
