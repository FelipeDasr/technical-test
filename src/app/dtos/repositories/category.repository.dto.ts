import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';

import { IEntityCollection, IPaginationQuery } from '.';
import { ICategoryRecord } from '../entities/category.dto';

export interface IFindAllCategoriesQuery extends IPaginationQuery {
  includeDeleted?: boolean;
}

export abstract class ICategoryRepository extends Repository<CategoryEntity> {
  public abstract findByName(name: string): Promise<ICategoryRecord | null>;
  public abstract findAll(
    query: IFindAllCategoriesQuery,
  ): Promise<IEntityCollection<ICategoryRecord>>;
}
