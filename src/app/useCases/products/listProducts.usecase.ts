import { Injectable } from '@nestjs/common';

import { IFindAllCategoriesQuery } from 'src/app/dtos/repositories/category.repository.dto';
import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';

@Injectable()
export class ListProductsUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(query: IFindAllCategoriesQuery) {
    return await this.productRepository.findAll(query);
  }
}
