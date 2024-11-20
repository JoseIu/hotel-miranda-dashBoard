import styled from 'styled-components';

interface GuestProps {
  img?: string;
  name?: string;
  lastName?: string;
  id?: string;
  startDate?: string;
}

const TableGuest = ({ img, name, lastName, id, startDate }: GuestProps) => {
  return (
    <GuestTd>
      {img && <img loading="lazy" src={img} alt={name} />}
      <div>
        <span>
          {name} {lastName}
        </span>
        <GuestId>#{id}</GuestId>
        {startDate && <span>{startDate}</span>}
      </div>
    </GuestTd>
  );
};

export default TableGuest;

const GuestTd = styled.div`
  display: flex;
  gap: 0.6rem;
  img {
    aspect-ratio: 2/2;
    width: 3em;
    height: 3em;
    border-radius: 0.3rem;
    border: 0.0625rem solid var(--text-dark);
    box-shadow: var(--box-shadow-small);
    animation: skeleton-loading 1s infinite alternate;
    @keyframes skeleton-loading {
      0% {
        background-color: var(--white-color);
      }
      100% {
        background-color: #c2c2c2;
      }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    row-gap: 0.3rem;
  }
`;

const GuestId = styled.span`
  color: #135846;
  font-size: 0.875em;
`;
