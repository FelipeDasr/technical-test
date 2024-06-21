import { IPaginationQuery } from 'src/core/dtos/repositories';

export function resolvePaginationQuery(query: IPaginationQuery) {
  const { page = 1, limit = 10 } = query;
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}
