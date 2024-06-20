import { JwtService } from '@nestjs/jwt';

import { DatabaseModule } from 'src/app/modules/database/database.module';

import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';
import { GenerateUserAuthTokenUsecase } from 'src/app/useCases/auth/generateUserAuthToken.usecase';
import { CreateCategoryUsecase } from 'src/app/useCases/categories/createCategory.usecase';
import { ListCategoriesUsecase } from 'src/app/useCases/categories/listCategories.usecase';
import { CreateProductUseCase } from 'src/app/useCases/products/createProduct.usecase';
import { GetCategoryDetailsUsecase } from 'src/app/useCases/categories/getCategoryDetails.usecase';
import { UpdateCategoryUsecase } from 'src/app/useCases/categories/updateCategory.usecase';
import { DeleteCategoryUseCase } from 'src/app/useCases/categories/deleteCategory.usecase';
import { GetProductDetailsUsecase } from 'src/app/useCases/products/getProductDetails.usecase';
import { UpdateProductUsecase } from 'src/app/useCases/products/updateProduct.usecase';
import { ListProductsUsecase } from 'src/app/useCases/products/listProducts.usecase';
import { AddProductToCartUseCase } from 'src/app/useCases/carts/addProductToCart.usecase';
import { GetCartDetailsUsecase } from 'src/app/useCases/carts/getCartDetails.usecase';
import { UpdateProductCartUsecase } from 'src/app/useCases/carts/updateProductCart.usecase';
import { RemoveProductFromCartUseCase } from 'src/app/useCases/carts/removeProductFromCart.usecase';
import { DeleteProductUseCase } from 'src/app/useCases/products/deleteProduct.usecase';
import { BuyUseCase } from 'src/app/useCases/checkout/buy.usecase';

export const httpProviders = [
  JwtService,
  CreateUserUseCase,
  GenerateUserAuthTokenUsecase,
  CreateCategoryUsecase,
  GetCategoryDetailsUsecase,
  ListCategoriesUsecase,
  UpdateCategoryUsecase,
  DeleteCategoryUseCase,
  CreateProductUseCase,
  GetProductDetailsUsecase,
  UpdateProductUsecase,
  ListProductsUsecase,
  DeleteProductUseCase,
  AddProductToCartUseCase,
  GetCartDetailsUsecase,
  UpdateProductCartUsecase,
  RemoveProductFromCartUseCase,
  BuyUseCase,
];

export const httpImports = [DatabaseModule];
