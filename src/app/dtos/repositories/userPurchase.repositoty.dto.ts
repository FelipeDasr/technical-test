import { Repository } from 'typeorm';
import { UserPurchaseEntity } from 'src/database/entities/userPurchase.entity';

import { IEntityCollection, IPaginationQuery } from '.';
import { IUserPurchaseSimpleData } from '../entities/userPurchase.dto';

export abstract class IUserPurchaseRepository extends Repository<UserPurchaseEntity> {
  public abstract saveWithItems(
    userId: number,
    totalAmount: number,
    items: { product_id: number; quantity: number; unit_price: number }[],
  ): Promise<UserPurchaseEntity>;
  public abstract findAllByUserId(
    userId: number,
    query: IPaginationQuery,
  ): Promise<IEntityCollection<IUserPurchaseSimpleData>>;
}
