import { DataSource } from 'typeorm';

import instanceOfDataSource from '../../database/datasource';

import { IUserRepository } from 'src/core/dtos/repositories/user.repository.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { ICategoryRepository } from 'src/core/dtos/repositories/category.repository.dto';
import { CategoryRepository } from 'src/database/repositories/category.repository';
import { IProductRepository } from 'src/core/dtos/repositories/product.repository.dto';
import { ProductRepository } from 'src/database/repositories/product.repository';
import { IProductCartRepository } from 'src/core/dtos/repositories/productCart.repository.dto';
import { ProductCartRepository } from 'src/database/repositories/productCart.repository';
import { IUserPurchaseRepository } from 'src/core/dtos/repositories/userPurchase.repositoty.dto';
import { UserPurchaseRepository } from 'src/database/repositories/userPurchase.repository';

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
  {
    provide: IUserPurchaseRepository,
    useClass: UserPurchaseRepository,
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
