import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { ProductCartEntity } from '../entities/productCart.entity';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import { IProductCart } from 'src/app/dtos/entities/productCart.dto';

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
    return await this.createQueryBuilder('productCart')
      .where(
        'productCart.user_id = :userId AND productCart.product_id = :productId',
        { userId, productId },
      )
      .getOne();
  }
}
