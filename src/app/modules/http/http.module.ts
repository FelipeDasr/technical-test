import { Module } from '@nestjs/common';

import { httpImports, httpProviders } from 'src/core/providers/http.providers';

import { UsersController } from './controllers/users.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { CartsController } from './controllers/carts.controller';
import { CheckoutController } from './controllers/checkout.controller';
import { PurchasesController } from './controllers/purchases.controller';

@Module({
  imports: httpImports,
  controllers: [
    UsersController,
    CategoriesController,
    ProductsController,
    CartsController,
    CheckoutController,
    PurchasesController,
  ],
  providers: httpProviders,
})
export class HttpModule {}
