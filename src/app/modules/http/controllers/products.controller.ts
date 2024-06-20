import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/app/dtos/requests';
import {
  ICreateProductRequest,
  IUpdateProductRequest,
} from 'src/app/dtos/requests/products.request.dto';
import { IFindAllProductsQuery } from 'src/app/dtos/repositories/product.repository.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createProductRequestValidator } from 'src/core/validators/products/createProduct.validator';
import { updateProductRequestValidator } from 'src/core/validators/products/updateProduct.validator';
import { listProductsRequestValidator } from 'src/core/validators/products/listProducts.validator';
import { idValidator } from 'src/core/validators/common/id.validator';

import { CreateProductUseCase } from 'src/app/useCases/products/createProduct.usecase';
import { GetProductDetailsUsecase } from 'src/app/useCases/products/getProductDetails.usecase';
import { UpdateProductUsecase } from 'src/app/useCases/products/updateProduct.usecase';
import { ListProductsUsecase } from 'src/app/useCases/products/listProducts.usecase';
import { DeleteProductUseCase } from 'src/app/useCases/products/deleteProduct.usecase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUsecase: CreateProductUseCase,
    private readonly getProductDetailsUsecase: GetProductDetailsUsecase,
    private readonly updateProductUsecase: UpdateProductUsecase,
    private readonly listProductsUsecase: ListProductsUsecase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(
    @Request() request: IAuthenticatedRequest,
    @Body(new ValidatorPipe(createProductRequestValidator))
    body: ICreateProductRequest,
    @Res() response: Response,
  ) {
    const { id: ownerId } = request.user;
    const newProduct = await this.createProductUsecase.execute(body, ownerId);
    return response.status(201).json(newProduct);
  }

  @Get(':id')
  public async getDetails(
    @Param('id', new ValidatorPipe(idValidator)) productId: number,
    @Res() response: Response,
  ) {
    const details = await this.getProductDetailsUsecase.execute(productId);
    return response.status(200).json(details);
  }

  @Get()
  public async list(
    @Query(new ValidatorPipe(listProductsRequestValidator))
    query: IFindAllProductsQuery,
    @Res() response: Response,
  ) {
    const products = await this.listProductsUsecase.execute(query);
    return response.status(200).json(products);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  public async update(
    @Param('id', new ValidatorPipe(idValidator)) productId: number,
    @Request()
    request: IAuthenticatedRequest,
    @Body(new ValidatorPipe(updateProductRequestValidator))
    body: IUpdateProductRequest,
    @Res() response: Response,
  ) {
    const result = await this.updateProductUsecase.execute(
      productId,
      body,
      request.user.id,
    );
    return response.status(200).json(result);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public async delete(
    @Param('id', new ValidatorPipe(idValidator)) productId: number,
    @Request() request: IAuthenticatedRequest,
    @Res() response: Response,
  ) {
    const result = await this.deleteProductUseCase.execute(
      productId,
      request.user.id,
    );

    return response.status(200).json(result);
  }
}
