import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

@Injectable()
export class RemoveProductFromCartUseCase {
  constructor(private cartRepository: IProductCartRepository) {}

  async execute(productCartId: number, userId: number) {
    const { affected } = await this.cartRepository.delete({
      id: productCartId,
      user_id: userId,
    });

    if (affected !== 1) {
      throw new NotFoundException('Product not found in cart');
    }

    return { message: 'Product removed from cart' };
  }
}
