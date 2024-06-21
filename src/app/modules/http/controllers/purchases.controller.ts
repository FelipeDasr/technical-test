import {
  Controller,
  Get,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/app/dtos/requests';
import { IPaginationQuery } from 'src/app/dtos/repositories';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { paginationRequestValidator } from 'src/core/validators/common/pagination.validator';

import { ListUserPurchasesUseCase } from 'src/app/useCases/purchases/listUserPurchases.usecase';

@Controller('purchases')
@UseGuards(AuthGuard)
export class PurchasesController {
  constructor(
    private readonly listUserPurchasesUseCase: ListUserPurchasesUseCase,
  ) {}

  @Get()
  async listUserPurchases(
    @Request() request: IAuthenticatedRequest,
    @Query(new ValidatorPipe(paginationRequestValidator))
    query: IPaginationQuery,
    @Res() response: Response,
  ) {
    const purchases = await this.listUserPurchasesUseCase.execute(
      request.user.id,
      query,
    );

    return response.status(200).json(purchases);
  }
}
