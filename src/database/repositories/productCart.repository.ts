import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductCartEntity } from '../entities/productCart.entity';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import {
  ICartDetails,
  IProductCart,
} from 'src/app/dtos/entities/productCart.dto';

import { mapCartDetails } from './utils/mappers/carts.mappers';
import {
  resolveFindByUserIdAndProductIdQuery,
  resolveFindCartDetailsQuery,
} from './utils/resolvers/carts';

@Injectable()
export class ProductCartRepository
  extends Repository<ProductCartEntity>
  implements IProductCartRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ProductCartEntity, dataSource.createEntityManager());
  }

  public async findByUserIdAndProductId(
    userId: number,
    productId: number,
  ): Promise<IProductCart | null> {
    return await resolveFindByUserIdAndProductIdQuery(this, userId, productId);
  }

  public async findCartDetailsByUserId(
    userId: number,
  ): Promise<ICartDetails | null> {
    const products = await resolveFindCartDetailsQuery(this, userId);
    return mapCartDetails(products);
  }
}
