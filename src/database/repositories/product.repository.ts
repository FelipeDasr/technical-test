import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';
import { IProduct, IProductDetails } from 'src/app/dtos/entities/product.dto';

import { mapProductDetails } from './utils/mappers/products.mappers';

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
    const rawData = await this.createQueryBuilder('product')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.unit_price',
        'product.deleted_at',
      ])
      // Category details
      .leftJoin('product.category', 'category')
      .addSelect(['category.id', 'category.name'])
      // Owner details
      .leftJoin('product.owner', 'owner')
      .addSelect(['owner.id', 'owner.name'])
      // Total of units sold
      .leftJoin('product.purchaseItems', 'purchaseItem')
      .addSelect('SUM(purchaseItem.quantity)', 'units_sold')
      //
      .groupBy('product.id, owner.id, category.id')
      .where('product.id = :id', { id })
      .getRawOne();

    if (!rawData) return null;
    return mapProductDetails(rawData);
  }
}
