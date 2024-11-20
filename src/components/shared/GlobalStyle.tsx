import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Form = styled.form`
  width: 60rem;
  border-radius: 0.4rem;

  background: var(--white-color);
  border: 0.0625rem solid var(--text-dark);
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
  background: var(--hover-color);

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

  background-color: ${(props) => (props.$selected ? 'var(--hover-color)' : 'var(--white-color)')};
  border: 0.0625rem solid var(--text-dark);
  color: ${(props) => (props.$selected ? 'var(--text-dark)' : 'black')};
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

  background: var(--white-color);
  outline: 0.0625rem solid var(--text-dark);
  transition: outline 0.3s ease-in;

  &:focus,
  &:hover {
    background-color: var(--hover-color);
    box-shadow: var(--box-shadow);
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
    color: var(--text-dark);
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
  padding: 0.3rem 1rem;
  cursor: pointer;
  font-weight: 500;
  color: ${(props) => props.$active && 'var(--text-dark)'};
  background-color: ${(props) => props.$active && 'var(--hover-color)'};
  border-right: 0.0625rem solid var(--text-dark);

  &:last-child {
    border-right: none;
  }
`;

export const ButtonGoBack = styled.button`
  max-width: 8rem;
  background-color: var(--hover-color);
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  font-weight: 600;
  cursor: pointer;
  border: 0.0625rem solid var(--text-dark);
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    box-shadow: var(--box-shadow);
  }
`;
