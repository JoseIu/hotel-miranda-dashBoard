import { NavLink, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import UserProfile from '../components/UserProfile';
import useAuth from '../hooks/useAuth';
import { routes } from './routes';

const DashBoard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <MainLayout>
        <Aside>
          <Logo />
          <nav>
            <AsideUl>
              {routes.map(({ to, name, Icon }) => (
                <li key={to}>
                  <StyledNavLink className={({ isActive }) => (isActive ? 'active' : '')} to={to}>
                    {Icon && <Icon />}
                    {name}
                  </StyledNavLink>
                </li>
              ))}
            </AsideUl>
          </nav>
          <UserProfile />
          <div>
            <span>Travl Hotel Admin Dashboard</span>
            <span>© 2020 All Rights Reserved</span>
          </div>
        </Aside>

        <Outlet />
      </MainLayout>
    </>
  );
};

export default DashBoard;

const Aside = styled.aside`
  padding: 1rem 2rem;
  background-color: #202020;
  box-shadow: 0.8125rem 0.1875rem 5rem #0000006e;

  display: flex;
  flex-direction: column;
  /* gap: 3rem; */
  justify-content: space-between;
`;

const MainLayout = styled.main`
  display: grid;
  grid-template-columns: 17.125rem auto;
  height: 100dvh;
`;

const AsideUl = styled.ul`
  color: #686868;
  display: flex;
  flex-direction: column;
  font-weight: 600;

  gap: 1rem;
  li {
    padding: 0.8rem 0;

    svg {
      width: 1.5rem;
    }
  }
`;
const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  transition: all 0.3s ease;
  &.active {
    color: red;
  }
`;
