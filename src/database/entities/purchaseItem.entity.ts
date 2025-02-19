import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserPurchaseEntity } from './userPurchase.entity';

import { IPurchaseItem } from 'src/core/dtos/entities/purchaseItem.dto';
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
  @JoinColumn({ name: 'user_purchase_id' })
  purchase: UserPurchaseEntity;

  @ManyToOne(() => ProductEntity, (product) => product.purchaseItems)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
