import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

import {
  ICategoryRepository,
  IFindAllCategoriesQuery,
} from 'src/core/dtos/repositories/category.repository.dto';
import {
  ICategory,
  ICategoryDetails,
} from 'src/core/dtos/entities/category.dto';
import { IEntityCollection } from 'src/core/dtos/repositories';
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
  ): Promise<IEntityCollection<ICategory>> {
    const [categories, total] = await this.findAndCount(
      resolveFindAllCategoriesQuery(query),
    );

    return {
      total,
      data: categories,
    };
  }

  public async findDetailsById(id: number): Promise<ICategoryDetails | null> {
    return (await this.createQueryBuilder('category')
      .select([
        'category.id',
        'category.name',
        'category.description',
        'category.deleted_at',
      ])
      .loadRelationCountAndMap(
        'category.total_of_products',
        'category.products',
        'product',
      )
      .groupBy('category.id')
      .where('category.id = :id', { id })
      .getOne()) as any as ICategoryDetails | null;
  }

  public async countActiveProducts(id: number): Promise<number> {
    const result = await this.query(
      'SELECT COUNT(*) FROM products WHERE category_id = $1 AND deleted_at IS NULL',
      [id],
    );

    return Number(result[0].count);
  }
}
