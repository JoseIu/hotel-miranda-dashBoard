import styled from 'styled-components';

export const ContainerSection = styled.section`
  background-color: var(--zinc-900);
  max-height: 100%;
`;
export const Wrapper = styled.div`
  position: relative;

  padding: 1rem 1rem 0 1rem;
  height: 80dvh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  row-gap: 1rem;
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
