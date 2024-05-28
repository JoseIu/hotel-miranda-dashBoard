import styled from 'styled-components';
import BuildIcond from './icons/BuildIcond';
interface LogoProps {
  isActived: boolean;
}

const Logo = ({ isActived }: LogoProps) => {
  return (
    <LogoContainer $isActived={isActived}>
      <BuildIcond />
      <h1>
        Travel <span>Hotel Miranda</span>
      </h1>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div<{ $isActived: boolean }>`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  svg {
    width: 2.9375rem;
    color: #1c7a61;
  }

  h1 {
    display: flex;
    flex-direction: column;
    color: #ebebeb;
    font-weight: 600;
    span {
      color: #686868;
      font-size: 0.8em;
    }
  }
`;
