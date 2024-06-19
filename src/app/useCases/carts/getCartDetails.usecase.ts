import { Injectable } from '@nestjs/common';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

@Injectable()
export class GetCartDetailsUsecase {
  constructor(private readonly productCartRepository: IProductCartRepository) {}

  public async execute(userId: number) {
    return await this.productCartRepository.findCartDetailsByUserId(userId);
  }
}
