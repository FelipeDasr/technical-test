import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';

import { ICreateProductRequest } from 'src/app/dtos/requests/products.request.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  public async execute(data: ICreateProductRequest, ownerId: number) {
    await this.validateDataBeforeCreation(data, ownerId);

    const newProduct = await this.productRepository.save({
      ...data,
      owner_id: ownerId,
    });

    newProduct.owner_id = undefined;
    newProduct.deleted_at = undefined;
    return newProduct;
  }

  private async validateDataBeforeCreation(
    data: ICreateProductRequest,
    ownerId: number,
  ) {
    const { name, category_id: categoryId } = data;
    const categoryQuery = { id: categoryId };

    const category = await this.categoryRepository.findOneBy(categoryQuery);
    if (!category) throw new NotFoundException('Category not found');

    const product = await this.productRepository.findByNameAndOwnerId(
      name,
      ownerId,
    );

    if (product) {
      throw new BadRequestException(
        'The user has already created this product',
      );
    }
  }
}
