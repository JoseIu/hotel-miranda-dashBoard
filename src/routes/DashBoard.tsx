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

                  <AsideTitle $isActived={isActived}>{name}</AsideTitle>
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
  padding: 1.2rem;
  width: 100%;
  width: ${(props) => (props.$isActived ? '90px' : '280px')};
  border-right: 0.0625rem solid var(--text-dark);
  transition: width 0.3s ease;
  background: var(--bg-color);
  text-wrap: nowrap;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const AsideTitle = styled.span<{ $isActived: boolean }>`
  display: ${(props) => (props.$isActived ? 'none' : 'block')};
`;

const MainLayout = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100dvh;
`;

const AsideUl = styled.ul`
  width: 100%;
  margin-bottom: 3rem;
  font-weight: 600;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  .icon {
    width: 1.5rem;
    flex-shrink: 0;
    color: var(--text-dark);
  }
`;
const StyledNavLink = styled(NavLink)`
  padding: 0.8rem;
  border-radius: 0.5rem;
  font-size: 1.1em;
  color: var(--text-dark);
  border: 0.0625rem solid transparent;

  display: flex;
  align-items: center;
  gap: 1.3rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--hover-color);
    box-shadow: var(--box-shadow);
    border: 0.0625rem solid var(--text-dark);
  }

  &.active {
    width: 100%;
    border: 0.0625rem solid var(--text-dark);
    background-color: var(--hover-color);
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
