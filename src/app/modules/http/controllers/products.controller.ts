import {
  Body,
  Controller,
  Get,
  Param,
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
import { idValidator } from 'src/core/validators/common/id.validator';

import { CreateProductUseCase } from 'src/app/useCases/products/createProduct.usecase';
import { GetProductDetailsUsecase } from 'src/app/useCases/products/getProductDetails.usecase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUsecase: CreateProductUseCase,
    private readonly getProductDetailsUsecase: GetProductDetailsUsecase,
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
}
