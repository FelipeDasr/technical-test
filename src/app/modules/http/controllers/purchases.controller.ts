import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { IAuthenticatedRequest } from 'src/core/dtos/requests';
import { IPaginationQuery } from 'src/core/dtos/repositories';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { paginationRequestValidator } from 'src/core/validators/common/pagination.validator';
import { idValidator } from 'src/core/validators/common/id.validator';

import { ListUserPurchasesUseCase } from 'src/app/useCases/purchases/listUserPurchases.usecase';
import { GetUserPurchaseDetailsUsecase } from 'src/app/useCases/purchases/getUserPurchaseDetails.usecase';

@Controller('purchases')
@UseGuards(AuthGuard)
export class PurchasesController {
  constructor(
    private readonly listUserPurchasesUseCase: ListUserPurchasesUseCase,
    private readonly getUserPurchaseDetailsUsecase: GetUserPurchaseDetailsUsecase,
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

  @Get(':userPurchaseId')
  async getUserPurchaseDetails(
    @Request() request: IAuthenticatedRequest,
    @Param('userPurchaseId', new ValidatorPipe(idValidator))
    userPurchaseId: number,
    @Res() response: Response,
  ) {
    const purchaseDetails = await this.getUserPurchaseDetailsUsecase.execute(
      request.user.id,
      userPurchaseId,
    );

    return response.status(200).json(purchaseDetails);
  }
}
