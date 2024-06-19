import { DataSource } from 'typeorm';

import instanceOfDataSource from '../../database/datasource';

import { IUserRepository } from 'src/app/dtos/repositories/user.repository.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { CategoryRepository } from 'src/database/repositories/category.repository';
import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';
import { ProductRepository } from 'src/database/repositories/product.repository';
import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import { ProductCartRepository } from 'src/database/repositories/productCart.repository';

const databaseRepositories = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: ICategoryRepository,
    useClass: CategoryRepository,
  },
  {
    provide: IProductRepository,
    useClass: ProductRepository,
  },
  {
    provide: IProductCartRepository,
    useClass: ProductCartRepository,
  },
];

export const databaseProviders = [
  ...databaseRepositories,
  {
    provide: DataSource,
    useFactory: async () => instanceOfDataSource.initialize(),
  },
];

export const databaseExports = [...databaseProviders];
