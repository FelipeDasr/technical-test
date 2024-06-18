import { NotFoundException } from '@nestjs/common';

import { GetProductDetailsUsecase } from './getProductDetails.usecase';
import { MockProductRepository } from '../../../../test/utils/mocks/repositories/productRepository.mock';

describe('GetProductDetailsUseCase', () => {
  const getProductDetailsUseCase = new GetProductDetailsUsecase(
    MockProductRepository,
  );

  it('should be defined', () => {
    expect(getProductDetailsUseCase).toBeDefined();
  });

  it('should return a product', async () => {
    const product = await getProductDetailsUseCase.execute(1);

    expect(product).toBeDefined();
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('unit_price');
    expect(product).toHaveProperty('deleted_at');
    expect(product).toHaveProperty('units_sold');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('owner');
  });

  it('should throw an error if product is not found', async () => {
    try {
      await getProductDetailsUseCase.execute(2);
    } catch (error) {
      expect(error.message).toBe('Product not found');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
