import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';

import { ICategory } from '../entities/category.dto';

export abstract class ICategoryRepository extends Repository<CategoryEntity> {
  public abstract findByName(name: string): Promise<ICategory | null>;
}
