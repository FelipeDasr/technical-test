import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';
import { IUserPurchaseWithItems } from 'src/app/dtos/entities/userPurchase.dto';
import { IPaginationQuery } from 'src/app/dtos/repositories';

import { resolvePaginationQuery } from '.';

export async function resolveFindAllPurchasesByUserQuery(
  repository: IUserPurchaseRepository,
  userId: number,
  query: IPaginationQuery,
) {
  const { skip, take } = resolvePaginationQuery(query);
  return await repository
    .createQueryBuilder('userPurchase')
    .where('userPurchase.user_id = :userId', { userId })
    .select([
      'userPurchase.id',
      'userPurchase.total_amount',
      'userPurchase.purchase_date',
    ])
    .skip(skip)
    .take(take)
    .orderBy('userPurchase.purchase_date', 'DESC')
    .getManyAndCount();
}

export function resolveFindPurchaseDetailsByUserQuery(
  repository: IUserPurchaseRepository,
  userId: number,
  purchaseId: number,
): Promise<IUserPurchaseWithItems> {
  return repository
    .createQueryBuilder('userPurchase')
    .leftJoinAndSelect('userPurchase.items', 'items')
    .leftJoinAndSelect('items.product', 'product')
    .where('userPurchase.id = :purchaseId', { purchaseId })
    .andWhere('userPurchase.user_id = :userId', { userId })
    .select([
      'userPurchase.id',
      'userPurchase.total_amount',
      'userPurchase.purchase_date',
      'items.unit_price',
      'items.quantity',
      'product.id',
      'product.name',
    ])
    .getOne();
}
