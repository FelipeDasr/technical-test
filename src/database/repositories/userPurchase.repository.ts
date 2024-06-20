import { Injectable } from '@nestjs/common';

import { UserPurchaseEntity } from '../entities/userPurchase.entity';
import { DataSource, Repository } from 'typeorm';

import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';
import { PurchaseItemEntity } from '../entities/purchaseItem.entity';
import { mapItemsToPurchaseItemEntity } from './utils/mappers/carts.mappers';

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
}
