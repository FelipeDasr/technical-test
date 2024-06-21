import { Injectable } from '@nestjs/common';

import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';
import { IPaginationQuery } from 'src/app/dtos/repositories';

@Injectable()
export class ListUserPurchasesUseCase {
  constructor(
    private readonly userPurchaseRepository: IUserPurchaseRepository,
  ) {}

  async execute(userId: number, pagination: IPaginationQuery) {
    return this.userPurchaseRepository.findAllByUserId(userId, pagination);
  }
}
