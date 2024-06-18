import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

import {
  IFindAllProductsQuery,
  IProductRepository,
} from 'src/app/dtos/repositories/product.repository.dto';
import { IProduct, IProductDetails } from 'src/app/dtos/entities/product.dto';

import { mapProductDetails } from './utils/mappers/products.mappers';
import { IEntityCollection } from 'src/app/dtos/repositories';

import {
  resolveListProductSimpleDetailsQuery,
  resolveProductDetailsQuery,
} from './utils/resolvers/products';

@Injectable()
export class ProductRepository
  extends Repository<ProductEntity>
  implements IProductRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  public async findByNameAndOwnerId(
    name: string,
    ownerId: number,
  ): Promise<IProduct | null> {
    return await this.createQueryBuilder('product')
      .where(
        'LOWER(product.name) = LOWER(:name) AND product.owner_id = :ownerId',
        { name, ownerId },
      )
      .getOne();
  }

  public async findDetailsById(id: number): Promise<IProductDetails | null> {
    const rawData = await resolveProductDetailsQuery(this, id);

    if (!rawData) return null;
    return mapProductDetails(rawData);
  }

  public async findAll(
    query: IFindAllProductsQuery,
  ): Promise<IEntityCollection<IProductDetails>> {
    return (await resolveListProductSimpleDetailsQuery(this, query)) as any;
  }
}
