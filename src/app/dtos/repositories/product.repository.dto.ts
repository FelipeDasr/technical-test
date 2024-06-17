import { Repository } from 'typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';

import { IProduct } from '../entities/product.dto';

export abstract class IProductRepository extends Repository<ProductEntity> {
  public abstract findByNameAndOwnerId(
    name: string,
    ownerId: number,
  ): Promise<IProduct | null>;
}
