import { IFindAllCategoriesQuery } from 'src/core/dtos/repositories/category.repository.dto';
import { resolvePaginationQuery } from '.';

export function resolveFindAllCategoriesQuery(query: IFindAllCategoriesQuery) {
  const { page, limit, includeDeleted = false } = query;
  return {
    withDeleted: includeDeleted ? true : false,
    ...resolvePaginationQuery({ page, limit }),
  };
}
