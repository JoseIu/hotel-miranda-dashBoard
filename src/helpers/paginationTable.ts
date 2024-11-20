export const paginationTable = <T>(items: T[], page: number, itemsPerPage: number): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  return items.slice(startIndex, endIndex);
};
