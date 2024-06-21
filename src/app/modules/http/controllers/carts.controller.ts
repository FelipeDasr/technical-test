import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/core/dtos/requests';
import {
  ICreateProductCartRequest,
  IUpdateProductCartRequest,
} from 'src/core/dtos/requests/carts.request.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createProductCartRequestValidator } from 'src/core/validators/carts/createProductCart.validator';
import { updateProductCartRequestValidator } from 'src/core/validators/carts/updateProductCart.validator';
import { idValidator } from 'src/core/validators/common/id.validator';

import { AddProductToCartUseCase } from 'src/app/useCases/carts/addProductToCart.usecase';
import { GetCartDetailsUsecase } from 'src/app/useCases/carts/getCartDetails.usecase';
import { UpdateProductCartUsecase } from 'src/app/useCases/carts/updateProductCart.usecase';
import { RemoveProductFromCartUseCase } from 'src/app/useCases/carts/removeProductFromCart.usecase';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(
    private readonly addProductToCartUseCase: AddProductToCartUseCase,
    private readonly updateProductCartUsecase: UpdateProductCartUsecase,
    private readonly getCartDetailsUsecase: GetCartDetailsUsecase,
    private readonly removeProductFromCartUseCase: RemoveProductFromCartUseCase,
  ) {}

  @Get()
  public async getCart(
    @Request() request: IAuthenticatedRequest,
    @Res() response: Response,
  ) {
    const cart = await this.getCartDetailsUsecase.execute(request.user.id);
    return response.status(200).json(cart);
  }

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
    @Param('productCartId', new ValidatorPipe(idValidator))
    productCartId: number,
    @Body(new ValidatorPipe(updateProductCartRequestValidator))
    body: IUpdateProductCartRequest,
    @Res() response: Response,
  ) {
    const result = await this.updateProductCartUsecase.execute(
      request.user.id,
      productCartId,
      body,
    );

    return response.status(200).json(result);
  }

  @Delete('products/:productCartId')
  public async removeProduct(
    @Request() request: IAuthenticatedRequest,
    @Param('productCartId', new ValidatorPipe(idValidator))
    productCartId: number,
    @Res() response: Response,
  ) {
    const deletionResult = await this.removeProductFromCartUseCase.execute(
      productCartId,
      request.user.id,
    );

    return response.status(200).json(deletionResult);
  }
}
