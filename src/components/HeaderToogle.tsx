import styled from 'styled-components';
import useMenu from '../hooks/useMenu';
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

const HeaderToogle = () => {
  const { isActived, setIsActived } = useMenu();

  return (
    <>
      {isActived ? (
        <ButtonToogle aria-label="button to show menu" onClick={() => setIsActived(!isActived)}>
          <ArrowRight />
        </ButtonToogle>
      ) : (
        <ButtonToogle aria-label="button to hidden menu" onClick={() => setIsActived(!isActived)}>
          <ArrowLeft />
        </ButtonToogle>
      )}
    </>
  );
};

export default HeaderToogle;

const ButtonToogle = styled.button`


    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
  svg {
    width: 1.75rem;
    color: var(--text-dark);
  

`;
