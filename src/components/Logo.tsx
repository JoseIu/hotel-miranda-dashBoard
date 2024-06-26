import styled from 'styled-components';
import BuildIcond from './icons/BuildIcond';
interface LogoProps {
  isActived: boolean;
}

const Logo = ({ isActived }: LogoProps) => {
  return (
    <LogoContainer $isActived={isActived}>
      <BuildIcond />
      <h1>Hotel Miranda</h1>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div<{ $isActived: boolean }>`
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  gap: 0.3rem;
  svg {
    width: 2.3rem;
    color: #1c7a61;
  }

  h1 {
    color: #ebebeb;
    font-weight: 600;
  }
`;
