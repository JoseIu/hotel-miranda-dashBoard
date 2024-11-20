import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import HeaderToogle from './HeaderToogle';
import ArrowBoxRight from './icons/ArrowBoxRight';
import BellIcon from './icons/BellIcon';
import InBoxIcon from './icons/InBoxIcon';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { dispatch } = useAuth();
  return (
    <HeaderContainer>
      <DashboardTitle>
        <HeaderToogle />

        <h2> {title}</h2>
      </DashboardTitle>

      <DashboardOptions>
        <DashboardUl>
          <li>
            <InBoxIcon />
          </li>
          <li>
            <BellIcon />
          </li>
          <li>
            <button aria-label="button to log out" onClick={() => dispatch({ type: 'LOGOUT' })}>
              <ArrowBoxRight />
            </button>
          </li>
        </DashboardUl>
      </DashboardOptions>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  padding: 2rem 2rem;
  border-bottom: 0.0625rem solid var(--text-dark);
  display: flex;
  justify-content: space-between;
`;

const DashboardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  color: var(--text-dark);

  h2 {
    font-size: 1.75em;
    font-weight: 600;
  }
`;

const DashboardOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  button {
    padding: 0.5rem;
    background-color: var(--white-color);
    border: 0.0625rem solid var(--text-dark);
    border-radius: 50%;
    cursor: pointer;
    svg {
      color: var(--text-dark);
    }
    &:hover {
      box-shadow: 3px 2px 0 0 var(--text-dark);
    }
  }
`;

const DashboardUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  svg {
    color: var(--text-dark);
    width: 1.625rem;
  }
`;
