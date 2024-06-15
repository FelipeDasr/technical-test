import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { UserPurchaseEntity } from './userPurchase.entity';

import { IPurchaseItem } from 'src/app/dtos/entities/purchaseItem.dto';
import { ProductEntity } from './product.entity';

@Entity('purchase_items')
export class PurchaseItemEntity implements IPurchaseItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  product_id: number;

  @Column()
  unit_price: number;

  @Column()
  user_purchase_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => UserPurchaseEntity, (userPurchase) => userPurchase.items)
  purchase: UserPurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseItems)
  product: ProductEntity;
}
