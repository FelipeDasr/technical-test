import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ICategoryRepository } from 'src/core/dtos/repositories/category.repository.dto';

import { IProductRepository } from 'src/core/dtos/repositories/product.repository.dto';
import { IUpdateProductRequest } from 'src/core/dtos/requests/products.request.dto';

@Injectable()
export class UpdateProductUsecase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  public async execute(
    productId: number,
    data: IUpdateProductRequest,
    userId: number,
  ) {
    await this.checkProductOwner(userId, productId);
    await this.checkProductName(userId, productId, data.name);
    await this.checkCategory(data.category_id);

    await this.productRepository.update(productId, data);
    return {
      message: 'Product updated successfully',
    };
  }

  private async checkProductOwner(userId: number, productId: number) {
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.owner_id !== userId) {
      throw new UnauthorizedException(
        'You are not allowed to update this product',
      );
    }
  }

  private async checkProductName(
    userId: number,
    productId: number,
    name?: string,
  ) {
    // Check if the name is already in use (only if it was provided)
    if (name) {
      const product = await this.productRepository.findByNameAndOwnerId(
        name,
        userId,
      );

      if (product && product?.id !== productId) {
        throw new BadRequestException(
          `The user has already created a product with the name "${name}"`,
        );
      }
    }
  }

  private async checkCategory(categoryId?: number) {
    // Check if category exists (only if it was provided)
    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }
  }
}
