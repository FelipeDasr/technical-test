import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

import { IProductCart } from 'src/app/dtos/entities/productCart.dto';

@Entity('product_carts')
export class ProductCartEntity implements IProductCart {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductEntity, (product) => product.productCarts)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.productCarts)
  user: UserEntity;
}
