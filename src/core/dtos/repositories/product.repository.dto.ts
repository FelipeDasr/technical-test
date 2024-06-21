import { Repository } from 'typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';

import { IProduct, IProductDetails } from '../entities/product.dto';
import { IEntityCollection, IPaginationQuery } from '.';

export interface IFindAllProductsQuery extends IPaginationQuery {
  categories?: number[];
  orderByPrice?: 'ASC' | 'DESC';
  minPrice?: number;
  maxPrice?: number;
}

export abstract class IProductRepository extends Repository<ProductEntity> {
  public abstract findByNameAndOwnerId(
    name: string,
    ownerId: number,
  ): Promise<IProduct | null>;
  public abstract findAll(
    query: IFindAllProductsQuery,
  ): Promise<IEntityCollection<IProductDetails>>;
  public abstract findDetailsById(id: number): Promise<IProductDetails | null>;
}
