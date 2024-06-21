import { Injectable } from '@nestjs/common';

import { UserPurchaseEntity } from '../entities/userPurchase.entity';
import { DataSource, Repository } from 'typeorm';
import { PurchaseItemEntity } from '../entities/purchaseItem.entity';

import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';
import { IEntityCollection, IPaginationQuery } from 'src/app/dtos/repositories';
import {
  IUserPurchaseSimpleData,
  IUserPurchaseWithItems,
} from 'src/app/dtos/entities/userPurchase.dto';

import { mapItemsToPurchaseItemEntity } from './utils/mappers/carts.mappers';
import {
  resolveFindAllPurchasesByUserQuery,
  resolveFindPurchaseDetailsByUserQuery,
} from './utils/resolvers/purchases';

@Injectable()
export class UserPurchaseRepository
  extends Repository<UserPurchaseEntity>
  implements IUserPurchaseRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UserPurchaseEntity, dataSource.createEntityManager());
  }

  public async saveWithItems(
    userId: number,
    totalAmount: number,
    items: { product_id: number; quantity: number; unit_price: number }[],
  ): Promise<UserPurchaseEntity> {
    const userPurchase = new UserPurchaseEntity();
    userPurchase.user_id = userId;
    userPurchase.total_amount = totalAmount;
    userPurchase.purchase_date = new Date();

    await this.save(userPurchase);

    const purchaseItems = mapItemsToPurchaseItemEntity(items, userPurchase);
    await this.dataSource.getRepository(PurchaseItemEntity).save(purchaseItems);

    return userPurchase;
  }

  public async findAllByUserId(
    userId: number,
    query: IPaginationQuery,
  ): Promise<IEntityCollection<IUserPurchaseSimpleData>> {
    const [purchases, total] = await resolveFindAllPurchasesByUserQuery(
      this,
      userId,
      query,
    );

    return {
      total,
      data: purchases,
    };
  }

  public async findDetailsByIdAndUserId(
    userId: number,
    purchaseId: number,
  ): Promise<IUserPurchaseWithItems> {
    return await resolveFindPurchaseDetailsByUserQuery(
      this,
      userId,
      purchaseId,
    );
  }
}
