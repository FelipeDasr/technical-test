import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { IProductRepostory } from 'src/app/dtos/repositories/product.repository.dto';

import { ICreateProductRequest } from 'src/app/dtos/requests/products.request.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly productRepostory: IProductRepostory,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  public async execute(data: ICreateProductRequest, ownerId: number) {
    await this.validateDataBeforeCreation(data, ownerId);

    const newProduct = await this.productRepostory.save({
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

    const product = await this.productRepostory.findByNameAndOwnerId(
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
