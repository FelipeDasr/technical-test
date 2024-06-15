import instanceOfDataSource from '../../database/datasource';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => instanceOfDataSource.initialize(),
  },
];
