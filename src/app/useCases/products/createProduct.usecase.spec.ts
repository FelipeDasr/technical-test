import { BadRequestException, NotFoundException } from '@nestjs/common';

import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';
import { MockProductRepository } from '../../../../test/utils/mocks/repositories/productRepository.mock';

import { CreateProductUseCase } from './createProduct.usecase';

describe('CreateProductUseCase', () => {
  const createProductUseCase = new CreateProductUseCase(
    MockProductRepository,
    MockCategoryRepository,
  );

  const validCategory = { name: 'valid_category' } as any;
  const ownerId = 1;

  const dataToReturnProduct = {
    name: 'return_product',
    category_id: 1,
    description: 'Product description',
    unit_price: 10,
  };

  const dataToReturnNull = {
    ...dataToReturnProduct,
    name: 'return_null',
  };

  it('should be able to create a new product', async () => {
    jest
      .spyOn(MockCategoryRepository, 'findOneBy')
      .mockResolvedValue(validCategory);

    const createdProduct = await createProductUseCase.execute(
      dataToReturnNull,
      ownerId,
    );

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct.name).toEqual(dataToReturnNull.name);
    expect(createdProduct.category_id).toEqual(dataToReturnNull.category_id);
    expect(createdProduct.description).toEqual(dataToReturnNull.description);
    expect(createdProduct.unit_price).toEqual(dataToReturnNull.unit_price);
  });

  it('should not be able to create a new product with an existing name', async () => {
    jest
      .spyOn(MockCategoryRepository, 'findOneBy')
      .mockResolvedValue(validCategory);

    try {
      await createProductUseCase.execute(dataToReturnProduct, ownerId);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('The user has already created this product');
    }
  });

  it('should not be able to create a new product with an invalid category', async () => {
    jest.spyOn(MockCategoryRepository, 'findOneBy').mockResolvedValue(null);

    try {
      await createProductUseCase.execute(dataToReturnProduct, ownerId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Category not found');
    }
  });
});
