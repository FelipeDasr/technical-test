import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ProductCartEntity } from './productCart.entity';
import { CategoryEntity } from './category.entity';
import { UserEntity } from './user.entity';

import { IProduct } from 'src/app/dtos/entities/product.dto';
import { PurchaseItemEntity } from './purchaseItem.entity';

@Entity('products')
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unit_price: number;

  @Column()
  category_id: number;

  @Column()
  owner_id: number;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (owner) => owner.products)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @OneToMany(() => ProductCartEntity, (product) => product.product)
  productCarts: ProductEntity;

  @OneToMany(() => PurchaseItemEntity, (purchaseItem) => purchaseItem.product)
  purchaseItems: PurchaseItemEntity[];
}
