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

import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor() {}

  @Get()
  public async getCart(
    @Request() request: IAuthenticatedRequest,
    @Res() response: Response,
  ) {}

  @Post('products')
  public async addProduct(
    @Request() request: IAuthenticatedRequest,
    @Body() body: any,
    @Res() response: Response,
  ) {}

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
