import { Repository } from 'typeorm';
import { ProductCartEntity } from 'src/database/entities/productCart.entity';

import {
  ICartDetails,
  IProductCart,
  IProductCartSimpleData,
} from '../entities/productCart.dto';

export abstract class IProductCartRepository extends Repository<ProductCartEntity> {
  public abstract findByUserIdAndProductId(
    userId: number,
    productId: number,
  ): Promise<IProductCart | null>;
  public abstract findCartDetailsByUserId(
    userId: number,
  ): Promise<ICartDetails | null>;
  public abstract findAllByUserId(
    userId: number,
  ): Promise<IProductCartSimpleData[]>;
}
