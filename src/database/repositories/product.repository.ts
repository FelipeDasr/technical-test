import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';
import { IProduct } from 'src/app/dtos/entities/product.dto';

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
}
