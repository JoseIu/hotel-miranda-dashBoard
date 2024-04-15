import styled from 'styled-components';
import BellIcon from './icons/BellIcon';
import BurgerIcon from './icons/BurgerIcon';
import ChatIcon from './icons/ChatIcon';
import HeartIcon from './icons/HeartIcon';
import InBoxIcon from './icons/InBoxIcon';

const Header = () => {
  return (
    <HeaderContainer>
      <DashboardTitle>
        <BurgerIcon />
        <h2> Dashboard</h2>
      </DashboardTitle>

      <DashboardOptions>
        <input type="text" name="search" id="search" />
        <DashboardUl>
          <li>
            <HeartIcon />
          </li>
          <li>
            <InBoxIcon />
          </li>
          <li>
            <BellIcon />
          </li>
          <li>
            <ChatIcon />
          </li>
        </DashboardUl>

        <img src="#" alt="IMAGE" />
        <select name="lang" id="lang">
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
      </DashboardOptions>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  padding: 2rem 2rem;
  background-color: #202020;
  box-shadow: 0px 3px 10px #00000005;

  display: flex;
  justify-content: space-between;
`;

const DashboardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  color: #ffffff;
  svg {
    width: 1.75rem;
    color: #ffffff;
  }
  h2 {
    font-size: 1.75em;
    font-weight: 600;
  }
`;

const DashboardOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  input {
    width: 21.875rem;
    height: 3.5rem;
    background-color: #171717;
    border-radius: 0.75rem;
  }

  img {
    width: 3.75rem;
    height: 3.75rem;
    background-color: #c5c5c5;
    border-radius: 0.5rem;
  }
  select {
    color: #e23428;
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
