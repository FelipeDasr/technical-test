import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductRepository } from 'src/core/dtos/repositories/product.repository.dto';
import { IProductCartRepository } from 'src/core/dtos/repositories/productCart.repository.dto';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productCartRepository: IProductCartRepository,
  ) {}

  async execute(productId: number, userId: number) {
    const { affected } = await this.productRepository.softDelete({
      id: productId,
      owner_id: userId,
    });

    if (affected === 0) {
      throw new NotFoundException('Product not found');
    }

    // Delete product from carts
    await this.productCartRepository.delete({ product_id: productId });

    return { message: 'Product deleted successfully' };
  }
}
