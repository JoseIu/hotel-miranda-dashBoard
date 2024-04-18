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
          <TableRow>
            {columns.map((colum) => (
              <th key={colum.key}>{colum.label}</th>
            ))}
          </TableRow>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  height: 100%;
  table {
    height: 100%;

    color: #e8f2ef;
    width: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    background-color: #202020;
  }
`;
const TableRow = styled.tr`
  border-bottom: 0.0625rem solid #3d3d3d;

  th {
    padding: 1.3rem 1rem;
    text-align: start;
  }
`;
