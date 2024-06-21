import { Injectable, NotFoundException } from '@nestjs/common';

import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';

@Injectable()
export class GetUserPurchaseDetailsUsecase {
  constructor(
    private readonly userPurchaseRepository: IUserPurchaseRepository,
  ) {}

  public async execute(userId: number, purchaseId: number) {
    const purchaseDetails =
      await this.userPurchaseRepository.findDetailsByIdAndUserId(
        userId,
        purchaseId,
      );

    if (!purchaseDetails) {
      throw new NotFoundException('User purchase not found');
    }

    return purchaseDetails;
  }
}
