import { useEffect } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import UserProfile from '../components/UserProfile';
import isTokenExpired from '../helpers/isTokenExpired';
import useAuth from '../hooks/useAuth';
import useMenu from '../hooks/useMenu';
import { routes } from './routes';

const DashBoard = () => {
  const { userData, dispatch } = useAuth();
  const { isActived } = useMenu();
  useEffect(() => {
    const tokenExpired = isTokenExpired();
    if (tokenExpired) {
      dispatch({
        type: 'LOGOUT',
      });
    }
  }, [dispatch]);

  if (!userData.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <MainLayout>
      <Aside $isActived={isActived}>
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

const Aside = styled.aside<{ $isActived: boolean }>`
  width: ${(props) => (props.$isActived ? '90px' : '280px')};
  padding: 1.2rem;
  transition: width 0.3s ease;
  background: linear-gradient(145deg, #161618, #1a1a1d);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  text-wrap: nowrap;
`;

const MainLayout = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100dvh;
`;

const AsideUl = styled.ul`
  margin-bottom: 3rem;
  font-weight: 600;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  .icon {
    width: 1.5rem;
    flex-shrink: 0;
    color: var(--zinc-400);
  }
`;
const StyledNavLink = styled(NavLink)`
  padding: 0.8rem;
  border-radius: 0.5rem;
  font-size: 1.1em;
  color: var(--zinc-400);

  display: flex;
  align-items: center;
  gap: 1.3rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.active {
    width: 100%;
    background-color: var(--green);
    color: var(--zinc-100);
    .icon {
      color: var(--zinc-100);
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
