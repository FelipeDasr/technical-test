import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/app/dtos/requests';
import { ICreateProductCartRequest } from 'src/app/dtos/requests/carts.request.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createProductCartRequestValidator } from 'src/core/validators/carts/createProductCart.validator';

import { AddProductToCartUseCase } from 'src/app/useCases/carts/addProductToCart.usecase';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
  ) {}

  @Get()
  public async getCart(
    @Request() request: IAuthenticatedRequest,
    @Res() response: Response,
  ) {}

  @Post('products')
  public async addProduct(
    @Request() request: IAuthenticatedRequest,
    @Body(new ValidatorPipe(createProductCartRequestValidator))
    body: ICreateProductCartRequest,
    @Res() response: Response,
  ) {
    const result = await this.addProductToCartUseCase.execute(
      request.user.id,
      body.product_id,
      body.quantity,
    );

    return response.status(201).json(result);
  }

  @Patch('products/:productCartId')
  public async update(
    @Request() request: IAuthenticatedRequest,
    @Body() body: any,
    @Res() response: Response,
  ) {}

  @Delete('products/:productCartId')
  public async removeProduct(
    @Request() request: IAuthenticatedRequest,
    @Res() response: Response,
  ) {}
}
