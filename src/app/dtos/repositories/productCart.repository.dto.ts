import { Repository } from 'typeorm';
import { ProductCartEntity } from 'src/database/entities/productCart.entity';

import { IProductCart } from '../entities/productCart.dto';

export abstract class IProductCartRepository extends Repository<ProductCartEntity> {
  public abstract findByUserIdAndProductId(
    userId: number,
    productId: number,
  ): Promise<IProductCart | null>;
}
