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
  border: 0.0625rem solid var(--text-dark);
  background-color: var(--white-color);
  &:focus-within {
    box-shadow: var(--box-shadow);
  }

  svg {
    position: absolute;
    width: 1rem;
    top: 30%;
    left: 0.8rem;
    pointer-events: none;
  }
`;
const InputSearch = styled.input`
  width: 100%;
  padding: 0.5rem 3rem;
  outline: none;
  &:focus {
    outline: 2px solid var(--text-dark);

    border-radius: 0.3em;
  }
`;
