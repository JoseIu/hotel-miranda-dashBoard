import { useState } from 'react';

type Props = {
  page: number;
  itemsPerPage: number;
};

export const useTablePagination = ({ page, itemsPerPage }: Props) => {
  const [pagination, setPagination] = useState({ page: page, itemsPerPage: itemsPerPage });

  const setPage = (page: number) => setPagination({ ...pagination, page });

  return { ...pagination, setPage };
};
