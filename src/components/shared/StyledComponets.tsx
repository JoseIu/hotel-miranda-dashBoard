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

export const Row = styled.tr`
  border-bottom: 0.0625rem solid #3d3d3d;

  td {
    padding: 0.5rem;
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
    props.$status === 'Check In' ? '#018b06' : props.$status === 'Check Out' ? '#F44336' : '#804000'};
`;

export const TableStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;

export const TableActions = styled.div`
  display: flex;
  gap: 1rem;
  .edit,
  .delete {
    width: 1.5rem;
  }
  .edit {
    color: var(--text-dark);
  }
  .delete {
    color: #ff0000;
  }
`;
