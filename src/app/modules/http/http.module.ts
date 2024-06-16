import { Module } from '@nestjs/common';

import { httpImports, httpProviders } from 'src/core/providers/http.providers';

import { UsersController } from './controllers/users.controller';
import { CategoriesController } from './controllers/categories.controller';

@Module({
  imports: httpImports,
  controllers: [UsersController, CategoriesController],
  providers: httpProviders,
})
export class HttpModule {}
