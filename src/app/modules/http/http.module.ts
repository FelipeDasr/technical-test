import { Module } from '@nestjs/common';

import { httpImports, httpProviders } from 'src/core/providers/http.providers';

import { UsersController } from './controllers/users.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { CartsController } from './controllers/carts.controller';

@Module({
  imports: httpImports,
  controllers: [
    UsersController,
    CategoriesController,
    ProductsController,
    CartsController,
  ],
  providers: httpProviders,
})
export class HttpModule {}
