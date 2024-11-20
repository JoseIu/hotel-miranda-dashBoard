import styled from 'styled-components';

export const PaginationContainer = styled.div`
  padding-left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PaginationBtnPrev = styled.button<{ $isInFirstPage: boolean }>`
  padding: 0.5rem;
  background-color: ${({ $isInFirstPage }) => ($isInFirstPage ? '#646464' : 'var(--white-color)')};

  border: 0.0625rem solid var(--text-dark);
  box-shadow: ${({ $isInFirstPage }) => ($isInFirstPage ? 'none' : 'var(--box-shadow-small)')};
  border-radius: 100%;
  pointer-events: ${({ $isInFirstPage }) => ($isInFirstPage ? 'none' : 'auto')};

  &:hover {
    background-color: var(--hover-color);
  }
`;
export const PaginationBtnNext = styled.button<{ $isInLastPage: boolean }>`
  padding: 0.5rem;
  background-color: ${({ $isInLastPage }) => ($isInLastPage ? '#646464' : 'var(--white-color)')};
  border: 0.0625rem solid var(--text-dark);
  box-shadow: var(--box-shadow);
  border-radius: 100%;

  pointer-events: ${({ $isInLastPage }) => ($isInLastPage ? 'none' : 'auto')};
  box-shadow: ${({ $isInLastPage }) => ($isInLastPage ? 'none' : 'var(--box-shadow-small)')};

  &:hover {
    background-color: var(--hover-color);
  }
`;
