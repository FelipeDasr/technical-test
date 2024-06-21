import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductCartEntity } from '../entities/productCart.entity';

import { IProductCartRepository } from 'src/core/dtos/repositories/productCart.repository.dto';
import {
  ICartDetails,
  IProductCart,
  IProductCartSimpleData,
} from 'src/core/dtos/entities/productCart.dto';

import {
  mapArrayOfCartSimpleData,
  mapCartDetails,
} from './utils/mappers/carts.mappers';
import {
  resolveFindAllByUserIdQuery,
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

  public async findAllByUserId(
    userId: number,
  ): Promise<IProductCartSimpleData[]> {
    const data = await resolveFindAllByUserIdQuery(this, userId);
    return mapArrayOfCartSimpleData(data);
  }
}
