import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

export function resolveFindCartDetailsQuery(
  repository: IProductCartRepository,
  userId: number,
) {
  return (
    repository
      .createQueryBuilder('productCart')
      // Product
      .leftJoin('productCart.product', 'product')
      .addSelect(['product.id', 'product.name', 'product.unit_price'])
      // Product Category
      .leftJoin('product.category', 'category')
      .addSelect(['category.name'])
      .where('productCart.user_id = :userId', { userId })
      .getMany()
  );
}

export function resolveFindByUserIdAndProductIdQuery(
  repository: IProductCartRepository,
  userId: number,
  productId: number,
) {
  return repository
    .createQueryBuilder('productCart')
    .where(
      'productCart.user_id = :userId AND productCart.product_id = :productId',
      { userId, productId },
    )
    .getOne();
}

export function resolveFindAllByUserIdQuery(
  repository: IProductCartRepository,
  userId: number,
) {
  return repository
    .createQueryBuilder('productCart')
    .where('productCart.user_id = :userId', { userId })
    .select(['productCart.product_id', 'productCart.quantity'])
    .leftJoin('productCart.product', 'product')
    .addSelect('product.unit_price')
    .getMany();
}
