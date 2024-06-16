import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/app/dtos/requests';
import { ICreateProductRequest } from 'src/app/dtos/requests/products.request.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createProductRequestValidator } from 'src/core/validators/products/createProduct.validator';

import { CreateProductUseCase } from 'src/app/useCases/products/createProduct.usecase';

@Controller('products')
export class ProductsController {
  constructor(private readonly createProductUsecase: CreateProductUseCase) {}

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
}
