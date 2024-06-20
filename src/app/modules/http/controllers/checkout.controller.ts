import { Controller, Post, Request, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/app/dtos/requests';

import { AuthGuard } from 'src/core/guards/auth.guard';

import { BuyUseCase } from 'src/app/useCases/checkout/buy.usecase';

@Controller('checkout')
@UseGuards(AuthGuard)
export class CheckoutController {
  constructor(private readonly buyUseCase: BuyUseCase) {}

  @Post()
  public async buy(
    @Request() req: IAuthenticatedRequest,
    @Res() response: Response,
  ) {
    const result = await this.buyUseCase.execute(req.user.id);
    return response.status(200).json(result);
  }
}
