import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import { IUpdateProductCartRequest } from 'src/app/dtos/requests/carts.request.dto';
import { IProductCart } from 'src/app/dtos/entities/productCart.dto';

@Injectable()
export class UpdateProductCartUsecase {
  constructor(private readonly productCartRepository: IProductCartRepository) {}

  public async execute(
    userId: number,
    productCartId: number,
    data: IUpdateProductCartRequest,
  ) {
    const productCart = await this.checkAndGetProductCart(
      userId,
      productCartId,
    );

    productCart.quantity = data.quantity;
    await this.productCartRepository.save(productCart);

    return { message: 'Product cart updated' };
  }

  private async checkAndGetProductCart(userId: number, productCartId: number) {
    const productCart = await this.productCartRepository.findOneBy({
      id: productCartId,
      user_id: userId,
    });

    if (!productCart) {
      throw new NotFoundException('Product cart not found');
    }

    return productCart as IProductCart;
  }
}
