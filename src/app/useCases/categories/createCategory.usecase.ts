import { BadRequestException, Injectable } from '@nestjs/common';

import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';

import { ICreateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

@Injectable()
export class CreateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(data: ICreateCategoryRequest) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      data.name,
    );

    if (categoryAlreadyExists) {
      throw new BadRequestException('Category already exists');
    }

    const newCategory = await this.categoryRepository.save({
      name: data.name,
      description: data.description || '',
    });

    newCategory.deleted_at = undefined;
    return newCategory;
  }
}
