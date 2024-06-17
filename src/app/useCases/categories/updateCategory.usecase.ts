import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { IUpdateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

@Injectable()
export class UpdateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(id: number, data: IUpdateCategoryRequest) {
    await this.checkIfCategoryExists(id);
    await this.checkCategoryName(id, data.name);

    await this.categoryRepository.update({ id }, data);
    return { message: 'Category updated successfully' };
  }

  private async checkIfCategoryExists(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }

  private async checkCategoryName(id: number, name: string) {
    const category = await this.categoryRepository.findByName(name);

    if (category && category?.id !== id) {
      throw new BadRequestException('Category name is already in use');
    }
  }
}
