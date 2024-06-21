import { Injectable, NotFoundException } from '@nestjs/common';

import { IProductRepository } from 'src/core/dtos/repositories/product.repository.dto';

@Injectable()
export class GetProductDetailsUsecase {
  constructor(private readonly productRepository: IProductRepository) {}

  public async execute(id: number) {
    const product = await this.productRepository.findDetailsById(id);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
