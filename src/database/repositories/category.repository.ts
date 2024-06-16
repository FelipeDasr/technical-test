import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

import {
  ICategoryRepository,
  IFindAllCategoriesQuery,
} from 'src/app/dtos/repositories/category.repository.dto';
import { ICategory, ICategoryRecord } from 'src/app/dtos/entities/category.dto';
import { IEntityCollection } from 'src/app/dtos/repositories';
import { resolveFindAllCategoriesQuery } from './utils/resolvers/categories';

@Injectable()
export class CategoryRepository
  extends Repository<CategoryEntity>
  implements ICategoryRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  public async findByName(name: string): Promise<ICategory | null> {
    return await this.createQueryBuilder('category')
      .where('LOWER(category.name) = LOWER(:name)', { name })
      .getOne();
  }

  public async findAll(
    query: IFindAllCategoriesQuery,
  ): Promise<IEntityCollection<ICategoryRecord>> {
    const [categories, total] = await this.findAndCount(
      resolveFindAllCategoriesQuery(query),
    );

    return {
      total,
      data: categories,
    };
  }
}
