import styled from 'styled-components';

export const ContainerSection = styled.section`
  background-color: var(--zinc-900);
  max-height: 100%;
`;
export const FormsContainer = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: center;
`;
export const Wrapper = styled.div`
  position: relative;

  padding: 1rem 1rem 0 1rem;
  max-height: 74dvh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--zinc-900);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--zinc-400);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Row = styled.tr`
  border-bottom: 0.0625rem solid #3d3d3d;

  td {
    padding: 0.5rem 1rem;
    vertical-align: middle;
    text-align: start;
    max-width: 12rem;
  }
`;
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
`;

export const BookingStatus = styled.td<{ $status?: 'Check In' | 'Check Out' | 'In Progress' }>`
  color: ${(props) =>
    props.$status === 'Check In' ? '#4CAF50' : props.$status === 'Check Out' ? '#F44336' : '#FFC107'};
`;

export const TableStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;

export const TableActions = styled.div`
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
    color: #ff0000;
  }
`;
