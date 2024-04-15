import styled from 'styled-components';
import BuildIcond from './icons/BuildIcond';

const Logo = () => {
  return (
    <LogoContainer>
      <BuildIcond />
      <h1>
        Travel <span>Hotel Admin Dashboard</span>
      </h1>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  svg {
    width: 2.9375rem;
    color: #1c7a61;
  }

  h1 {
    color: #ebebeb;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    span {
      color: #686868;
      font-size: 0.8em;
    }
  }
`;
