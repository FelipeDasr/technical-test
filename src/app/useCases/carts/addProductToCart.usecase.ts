import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';
import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

@Injectable()
export class AddProductToCartUseCase {
  constructor(
    private readonly productCartRepository: IProductCartRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  public async execute(userId: number, productId: number, quantity: number) {
    await this.checkProduct(productId);
    const successMessage = { message: 'Product added to cart' };

    const productCart =
      await this.productCartRepository.findByUserIdAndProductId(
        userId,
        productId,
      );

    // If the product is in the cart, update the quantity
    if (productCart) {
      productCart.quantity += quantity;
      await this.productCartRepository.save(productCart);
      return successMessage;
    }

    // If the product is not in the cart, add it
    await this.productCartRepository.save({
      product_id: productId,
      user_id: userId,
      quantity: quantity,
    });

    return successMessage;
  }

  private async checkProduct(productId: number) {
    const productExists = await this.productRepository.existsBy({
      id: productId,
    });

    if (!productExists) {
      throw new NotFoundException('Product not found');
    }
  }
}
