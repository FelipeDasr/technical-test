import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICategoryRepository } from 'src/core/dtos/repositories/category.repository.dto';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(id: number) {
    await this.checkIfCategoryExists(id);

    const activeProducts =
      await this.categoryRepository.countActiveProducts(id);

    if (activeProducts > 0) {
      throw new BadRequestException('Category has active products');
    }

    await this.categoryRepository.softDelete(id);
    return { message: 'Category deleted successfully' };
  }

  public async checkIfCategoryExists(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      select: ['id'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
