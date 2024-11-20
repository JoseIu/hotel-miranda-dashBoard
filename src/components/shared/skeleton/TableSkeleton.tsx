import styled from 'styled-components';

type TableSkeletonProps = {
  rows?: number;
};
export const TableSkeleton = ({ rows = 7 }: TableSkeletonProps) => {
  return (
    <TableSkeletonContainer>
      <WrapperSkeleton>
        {Array.from({ length: rows }).map((_, index) => (
          <TableSkeletonRown key={index} />
        ))}
      </WrapperSkeleton>
    </TableSkeletonContainer>
  );
};
const TableSkeletonContainer = styled.div`
  padding: 2rem;
`;

const WrapperSkeleton = styled.div`
  padding: 1rem 2rem;
  max-height: auto;
  background-color: var(--white-color);
  box-shadow: var(--box-shadow);
  border-radius: 0.3rem;
  border: 0.0625rem solid var(--text-dark);

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const TableSkeletonRown = styled.div`
  padding: 1.7em;
  border-radius: 0.3em;
  box-shadow: var(--box-shadow);
  border: 0.0625rem solid var(--text-dark);

  animation: skeleton-loading 1s infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: var(--white-color);
    }
    100% {
      background-color: #c2c2c2;
    }
  }
`;
