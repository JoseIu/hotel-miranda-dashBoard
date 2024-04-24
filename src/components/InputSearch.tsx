import styled from 'styled-components';
import IconSearch from './icons/IconSearch';

const InputSearh = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <InputSearchContainer>
    <IconSearch />
    <InputSearch {...props} type="text" />
  </InputSearchContainer>
);

export default InputSearh;

const InputSearchContainer = styled.div`
  max-width: 100%;
  position: relative;
  border-radius: 0.3rem;
  background-color: #202020;

  svg {
    position: absolute;
    width: 1rem;
    top: 27%;
    left: 0.8rem;
    pointer-events: none;
  }
`;
const InputSearch = styled.input`
  width: 100%;
  padding: 0.6rem 3rem;
  outline: none;
  &:focus {
    box-shadow: 0px 5px 6px -6px rgba(255, 255, 255, 0.44);
  }
  &::placeholder {
    color: #d3d3d34e;
  }
`;
