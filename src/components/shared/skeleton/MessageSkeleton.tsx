import styled from 'styled-components';

export const MessageSkeleton = () => {
  return (
    <MessageContainerSkeleton>
      <MessageCardSkeleton></MessageCardSkeleton>
      <MessageCardSkeleton></MessageCardSkeleton>
      <MessageCardSkeleton></MessageCardSkeleton>
      <MessageCardSkeleton></MessageCardSkeleton>
    </MessageContainerSkeleton>
  );
};
const MessageContainerSkeleton = styled.section`
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  gap: 1.5rem;
`;
const MessageCardSkeleton = styled.div`
  width: calc(100% / 4);
  border-radius: 0.3rem;
  aspect-ratio: 16/9;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  border: 0.0625rem solid var(--text-dark);
  box-shadow: var(--box-shadow);

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
