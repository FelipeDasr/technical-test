import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { ICategory } from 'src/app/dtos/entities/category.dto';

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
}
