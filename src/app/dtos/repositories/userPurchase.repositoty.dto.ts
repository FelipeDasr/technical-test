import { Repository } from 'typeorm';
import { UserPurchaseEntity } from 'src/database/entities/userPurchase.entity';

export abstract class IUserPurchaseRepository extends Repository<UserPurchaseEntity> {
  public abstract saveWithItems(
    userId: number,
    totalAmount: number,
    items: { product_id: number; quantity: number; unit_price: number }[],
  ): Promise<UserPurchaseEntity>;
}
