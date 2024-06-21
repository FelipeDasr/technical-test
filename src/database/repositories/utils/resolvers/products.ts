import {
  IFindAllProductsQuery,
  IProductRepository,
} from 'src/core/dtos/repositories/product.repository.dto';
import { resolvePaginationQuery } from '.';

function resolveSimpleDetailsQuery(repository: IProductRepository) {
  return (
    repository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.unit_price',
        'product.deleted_at',
      ])
      // Category details
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.name'])
  );
}

export function resolveProductDetailsQuery(
  repository: IProductRepository,
  id: number,
) {
  return (
    resolveSimpleDetailsQuery(repository)
      // Owner details
      .leftJoin('product.owner', 'owner')
      .addSelect(['owner.id', 'owner.name'])
      // Total of units sold
      .leftJoin('product.purchaseItems', 'purchaseItem')
      .addSelect('SUM(purchaseItem.quantity)', 'units_sold')
      .where('product.id = :id', { id })
      //
      .groupBy('product.id, owner.id, category.id')
      .getRawOne()
  );
}

export async function resolveListProductSimpleDetailsQuery(
  repository: IProductRepository,
  query: IFindAllProductsQuery,
) {
  const { skip, take } = resolvePaginationQuery(query);
  let inititalQuery = resolveSimpleDetailsQuery(repository)
    .groupBy('product.id, category.id')
    .skip(skip)
    .take(take);

  if (query.orderByPrice) {
    inititalQuery = inititalQuery.orderBy(
      'product.unit_price',
      query.orderByPrice,
    );
  }

  if (query.categories) {
    inititalQuery = inititalQuery.andWhere('category.id IN (:...categories)', {
      categories: query.categories,
    });
  }

  if (query.minPrice) {
    inititalQuery = inititalQuery.andWhere('product.unit_price >= :minPrice', {
      minPrice: query.minPrice,
    });
  }

  if (query.maxPrice) {
    inititalQuery = inititalQuery.andWhere('product.unit_price <= :maxPrice', {
      maxPrice: query.maxPrice,
    });
  }

  const [count, data] = await Promise.all([
    inititalQuery.getCount(),
    inititalQuery.getMany(),
  ]);

  return { total: count, data };
}
