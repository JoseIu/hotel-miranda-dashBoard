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
  background: linear-gradient(145deg, #161618, #1a1a1d);
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MainLayout = styled.main<{ $isActived: boolean }>`
  display: grid;
  transition: all 0.3s ease;
  grid: ${(props) => (props.$isActived ? '1fr / 94px auto' : '1fr / 280px auto')};

  height: 100dvh;
`;

const AsideUl = styled.ul`
  margin-bottom: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 600;

  gap: 1rem;
  li {
    padding: 0.8rem 0;
  }
  .icon {
    width: 1.5rem;
    color: #686868;
  }
`;
const StyledNavLink = styled(NavLink)`
  font-size: 1.1em;
  color: var(--zinc-400);
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  gap: 0.3rem;

  transition: all 0.3s ease;

  &.active {
    color: var(--green);
    .icon {
      color: var(--green);
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
