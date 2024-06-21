import { Injectable, NotFoundException } from '@nestjs/common';

import { ICategoryRepository } from 'src/core/dtos/repositories/category.repository.dto';

@Injectable()
export class GetCategoryDetailsUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(id: number) {
    const categoryDetails = await this.categoryRepository.findDetailsById(id);

    if (!categoryDetails) {
      throw new NotFoundException('Category not found');
    }

    return categoryDetails;
  }
}
