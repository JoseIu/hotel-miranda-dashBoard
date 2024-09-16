import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  width: 60rem;
  border-radius: 0.4rem;

  background: var(--bg-gradient);
  box-shadow: var(--box-shadow);
  padding: 2rem;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
export const OfferContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
`;
export const FormSubmmit = styled.button`
  width: 8rem;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-weight: 600;
  cursor: pointer;
  margin-inline: auto;
  background: var(--bg-gradient);
  box-shadow: var(--box-shadow);
`;
export const SelectOption = styled.option`
  background-color: #161618;
  color: #f4f4f5;
`;

export const Ships = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ShipsList = styled.div`
  display: flex;
  gap: 16px;
`;

export const Ship = styled.span<{ $selected: boolean }>`
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  cursor: pointer;

  background-color: ${(props) => (props.$selected ? 'rgb(64, 0, 241)' : 'white')};
  color: ${(props) => (props.$selected ? 'rgba(255, 255, 255, 0.959)' : 'black')};
`;
export const Error = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: rgb(237, 74, 74);
`;

export const ButtonAction = styled(Link)`
  padding: 0.5rem 1rem;

  border-radius: 0.4rem;
  font-weight: 600;
  cursor: pointer;

  background: var(--bg-gradient);
  outline: 1px solid var(--zinc-400);
  transition: outline 0.3s ease-in;
  &:focus {
    outline: 2px solid var(--green);
  }
  &:hover {
    outline: 2px solid var(--green);
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .edit,
  .delete {
    width: 1.5rem;
  }
  .edit {
    color: #bebeff;
  }
  .delete {
    cursor: pointer;

    color: #ff0000;
  }
`;

export const ContainerDiv = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FilterActive = styled.button<{ $active: boolean }>`
  cursor: pointer;
  font-weight: 600;
  color: ${(props) => (props.$active ? 'var(--green)' : 'var(--zinc-400)')};
`;
