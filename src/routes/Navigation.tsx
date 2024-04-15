import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { routes } from './routes';

const Navigation = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Aside>
          <Logo />
          <nav>
            <AsideUl>
              {routes.map(({ to, name, Icon }) => (
                <li key={to}>
                  <StyledNavLink className={({ isActive }) => (isActive ? 'active' : '')} to={to}>
                    {<Icon />}
                    {name}
                  </StyledNavLink>
                </li>
              ))}
            </AsideUl>
          </nav>
        </Aside>

        <Routes>
          {routes.map(({ to, path, Component }) => (
            <Route key={to} path={path} element={<Component />} />
          ))}

          <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default Navigation;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: #202020;
  box-shadow: 0.8125rem 0.1875rem 5rem #0000006e;
`;

const MainLayout = styled.main`
  display: grid;
  grid-template-columns: 17.125rem auto;
  /* gap: 1em; */
  height: 100dvh;
  background-color: lightblue;
`;

const AsideUl = styled.ul`
  color: #686868;
  display: flex;
  flex-direction: column;
  font-weight: 600;

  gap: 1rem;
  li {
    padding: 0.8rem;

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
