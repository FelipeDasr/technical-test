import { Injectable } from '@nestjs/common';

import {
  ICategoryRepository,
  IFindAllCategoriesQuery,
} from 'src/app/dtos/repositories/category.repository.dto';

@Injectable()
export class ListCategoriesUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(query: IFindAllCategoriesQuery) {
    return await this.categoryRepository.findAll(query);
  }
}
