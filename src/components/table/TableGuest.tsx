import styled from 'styled-components';

interface GuestProps {
  img: string;
  name: string;
  lastName: string;
  id: string;
  startDate?: string;
}

const TableGuest = ({ img, name, lastName, id, startDate }: GuestProps) => {
  return (
    <GuestTd>
      {img ? <img loading="lazy" src={img} alt={name} /> : 'LOAGING'}
      {/* <img src={img} alt={name} /> */}
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
    width: 2.5rem;
    border-radius: 0.3rem;
    aspect-ratio: 1/1;
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
