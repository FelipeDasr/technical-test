import { Injectable } from '@nestjs/common';

import { IFindAllCategoriesQuery } from 'src/core/dtos/repositories/category.repository.dto';
import { IProductRepository } from 'src/core/dtos/repositories/product.repository.dto';

@Injectable()
export class ListProductsUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(query: IFindAllCategoriesQuery) {
    return await this.productRepository.findAll(query);
  }
}
