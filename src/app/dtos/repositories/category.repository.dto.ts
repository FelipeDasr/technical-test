import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';

import { IEntityCollection, IPaginationQuery } from '.';
import { ICategory, ICategoryDetails } from '../entities/category.dto';

export interface IFindAllCategoriesQuery extends IPaginationQuery {
  includeDeleted?: boolean;
}

export abstract class ICategoryRepository extends Repository<CategoryEntity> {
  public abstract findByName(name: string): Promise<ICategory | null>;
  public abstract findAll(
    query: IFindAllCategoriesQuery,
  ): Promise<IEntityCollection<ICategory>>;
  public abstract findDetailsById(id: number): Promise<ICategoryDetails | null>;
  public abstract countActiveProducts(id: number): Promise<number>;
}
