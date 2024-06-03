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
  background: linear-gradient(145deg, #161618, #1a1a1d);
  display: flex;
  justify-content: space-between;
`;

const DashboardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  color: #ffffff;

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
    padding: 0.3rem;
    background-color: #e234281c;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    svg {
      color: #e23428;
    }
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const DashboardUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  svg {
    color: #135846;
    width: 1.625rem;
  }
`;
