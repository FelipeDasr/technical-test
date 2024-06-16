import { DataSource } from 'typeorm';

import instanceOfDataSource from '../../database/datasource';

import { IUserRepository } from 'src/app/dtos/repositories/user.repository.dto';
import { UserRepository } from 'src/database/repositories/user.repository';
import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { CategoryRepository } from 'src/database/repositories/category.repository';

const databaseRepositories = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
  },
  {
    provide: ICategoryRepository,
    useClass: CategoryRepository,
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
