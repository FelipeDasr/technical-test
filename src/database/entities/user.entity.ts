import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserPurchaseEntity } from './userPurchase.entity';
import { ProductCartEntity } from './productCart.entity';
import { ProductEntity } from './product.entity';

import { IUser } from 'src/app/dtos/entities/user.dto';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => ProductEntity, (product) => product.owner)
  products: ProductEntity[];

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.user)
  productCarts: ProductCartEntity[];

  @OneToMany(() => UserPurchaseEntity, (userPurchase) => userPurchase.user)
  purchases: UserPurchaseEntity[];
}
