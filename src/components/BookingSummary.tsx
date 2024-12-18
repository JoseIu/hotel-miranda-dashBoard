import styled from 'styled-components';

interface BookingSummaryProps {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  number: number;
  title: string;
}

const BookingSummary = ({ Icon, number, title }: BookingSummaryProps) => {
  return (
    <BookinCard>
      <IconContainer>
        <Icon />
      </IconContainer>

      <div>
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
    </BookinCard>
  );
};

export default BookingSummary;

const BookinCard = styled.article`
  padding: 2rem 2rem;
  border-radius: 0.6rem;
  background: var(--white-color);
  box-shadow: var(--box-shadow);
  color: var(--text-dark);
  border: 0.0625rem solid var(--text-dark);

  display: flex;
  gap: 1rem;
  svg {
    width: 1.75rem;
  }
  span {
    font-size: 2em;
  }
  h2 {
    font-size: 0.875em;
  }
`;

const IconContainer = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: var(--hover-color);
`;
