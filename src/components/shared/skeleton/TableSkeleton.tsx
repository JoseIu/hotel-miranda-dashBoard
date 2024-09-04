import styled from 'styled-components';
export const TableSkeleton = () => {
  return (
    <>
      <TableSkletonFilters></TableSkletonFilters>
      <WrapperSkeleton>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
        <TableSkeletonRown></TableSkeletonRown>
      </WrapperSkeleton>
    </>
  );
};

const WrapperSkeleton = styled.div`
  position: relative;

  padding: 1rem 1rem 0 1rem;
  max-height: 74dvh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 1.4em;
`;

const TableSkeletonRown = styled.div`
  padding: 2.2em;
  border-radius: 0.3em;

  animation: skeleton-loading 1s infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: var(--zinc-900);
    }
    100% {
      background-color: var(--zinc-800);
    }
  }
`;
const TableSkletonFilters = styled.div`
  width: 98%;
  margin-inline: auto;
  margin-bottom: 1.2em;
  padding: 2em;
  border-radius: 0.3em;

  animation: skeleton-loading 1s infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: var(--zinc-900);
    }
    100% {
      background-color: var(--zinc-800);
    }
  }
`;
