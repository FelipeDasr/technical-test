import { BadRequestException, Injectable } from '@nestjs/common';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { IUpdateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

@Injectable()
export class UpdateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(id: number, data: IUpdateCategoryRequest) {
    await this.checkCategoryName(id, data.name);

    const result = await this.categoryRepository.update({ id }, data);

    if (result.affected === 0) {
      throw new BadRequestException(
        'Category not updated, verifiy if the category exists',
      );
    }

    return { message: 'Category updated successfully' };
  }

  private async checkCategoryName(id: number, name: string) {
    const category = await this.categoryRepository.findByName(name);

    if (category && category?.id !== id) {
      throw new BadRequestException('Category name is already in use');
    }
  }
}
