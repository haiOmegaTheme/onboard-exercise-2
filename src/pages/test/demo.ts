type PaginationState = {
  page: number;
  limit: number;
  total: number;
};

type PaginatedResult<T> = {
  data: T[];
  pagination: PaginationState;
};

export const paginate = <T>(
  data: T[],
  pagination: PaginationState
): PaginatedResult<T> => {
  const { limit, page } = pagination;
  const totalItems = data?.length ?? 0;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      total: totalItems,
      page,
      limit,
    },
  };
};
