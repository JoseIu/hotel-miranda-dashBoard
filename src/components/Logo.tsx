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
  padding: 0.8rem;
  display: flex;
  align-items: center;
  gap: 1.3rem;
  svg {
    flex-shrink: 0;
    width: 2.3rem;
    color: var(--text-dark);
  }

  h1 {
    color: var(--text-dark);
    font-weight: 600;
    display: ${(props) => (props.$isActived ? 'none' : 'block')};
  }
`;
