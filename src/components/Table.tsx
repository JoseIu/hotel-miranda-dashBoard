import { ReactNode } from 'react';
import styled from 'styled-components';
interface TableColumn {
  label: string;
  key: string;
}
interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
}

const Table = ({ columns, children }: TableProps) => {
  return (
    <TableContainer>
      <table>
        <thead>
          <TableHead>
            {columns.map((colum) => (
              <th key={colum.key}>{colum.label}</th>
            ))}
          </TableHead>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  padding: 1rem 2rem;
  min-height: auto;
  table {
    width: 100%;
    border-radius: 0.3rem;
    color: var(--text-dark);
    background-color: var(--white-color);
    box-shadow: var(--box-shadow);
    outline: 0.0625rem solid var(--text-dark);
  }
`;
const TableHead = styled.tr`
  border-bottom: 0.0625rem solid var(--text-dark);

  th {
    padding: 1.3rem 1rem;
    text-align: start;
  }
`;
