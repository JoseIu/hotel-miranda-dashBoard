import ArrowLeft from '../icons/ArrowLeft';
import ArrowRight from '../icons/ArrowRight';
import { PaginationBtnNext, PaginationBtnPrev, PaginationContainer } from './paginationTableStyle';

type Props = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const PaginationTable = ({ page, setPage, totalPages }: Props) => {
  const isInFirstPage = page === 1;
  const isInLastPage = page === totalPages;
  return (
    <PaginationContainer>
      <PaginationBtnPrev $isInFirstPage={isInFirstPage} onClick={() => setPage(page - 1)}>
        <ArrowLeft />
      </PaginationBtnPrev>
      <span>
        {page}/{totalPages}
      </span>
      <PaginationBtnNext $isInLastPage={isInLastPage} onClick={() => setPage(page + 1)}>
        <ArrowRight />
      </PaginationBtnNext>
    </PaginationContainer>
  );
};
