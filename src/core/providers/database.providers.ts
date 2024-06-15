import { DataSource } from 'typeorm';

import instanceOfDataSource from '../../database/datasource';

import { IUserRepository } from 'src/app/dtos/repositories/user.repository.dto';
import { UserRepository } from 'src/database/repositories/user.repository';

const databaseRepositories = [
  {
    provide: IUserRepository,
    useClass: UserRepository,
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
