import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { PurchaseItemEntity } from './purchaseItem.entity';
import { UserEntity } from './user.entity';

import { IUserPurchase } from 'src/core/dtos/entities/userPurchase.dto';

@Entity('user_purchases')
export class UserPurchaseEntity implements IUserPurchase {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  total_amount: number;

  @Column()
  user_id: number;

  @Column()
  purchase_date: Date;

  @ManyToOne(() => UserEntity, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => PurchaseItemEntity, (purchaseItem) => purchaseItem.purchase)
  items: PurchaseItemEntity[];
}
