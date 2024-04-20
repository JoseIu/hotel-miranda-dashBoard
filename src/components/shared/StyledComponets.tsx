import styled from 'styled-components';

export const ContainerSection = styled.section`
  background-color: #171717;
  max-height: 100%;
`;
export const Wrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  height: 80dvh;
  overflow-y: auto;
`;

export const Row = styled.tr`
  border-bottom: 0.0625rem solid #3d3d3d;

  td {
    padding: 0.5rem 1rem;
    vertical-align: middle;
    text-align: start;
  }
`;
