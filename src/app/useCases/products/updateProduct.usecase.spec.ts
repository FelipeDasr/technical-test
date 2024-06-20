import { IUpdateProductRequest } from 'src/app/dtos/requests/products.request.dto';

import { MockProductRepository } from '../../../../test/utils/mocks/repositories/productRepository.mock';
import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';

import { UpdateProductUsecase } from './updateProduct.usecase';

describe('UpdateProductUsecase', () => {
  const usecase = new UpdateProductUsecase(
    MockProductRepository,
    MockCategoryRepository,
  );

  it('should update a product successfully', async () => {
    const productId = 1;
    const userId = 1;
    const data: IUpdateProductRequest = { name: 'new_name', category_id: 1 };

    MockProductRepository.findOneBy = jest
      .fn()
      .mockResolvedValue({ owner_id: userId });
    MockProductRepository.findByNameAndOwnerId = jest
      .fn()
      .mockResolvedValue(null);
    MockCategoryRepository.findOneBy = jest.fn().mockResolvedValue({});
    MockProductRepository.update = jest.fn().mockResolvedValue({});

    const result = await usecase.execute(productId, data, userId);

    expect(result).toEqual({ message: 'Product updated successfully' });
  });

  it('should throw an error if the product does not exist', async () => {
    const productId = 1;
    const userId = 1;
    const data: IUpdateProductRequest = { name: 'new_name', category_id: 1 };

    MockProductRepository.findOneBy = jest.fn().mockResolvedValue(null);

    await expect(usecase.execute(productId, data, userId)).rejects.toThrow(
      'Product not found',
    );
  });

  it('should throw an error if the user is not the owner of the product', async () => {
    const productId = 1;
    const userId = 1;
    const data: IUpdateProductRequest = { name: 'new_name', category_id: 1 };

    MockProductRepository.findOneBy = jest
      .fn()
      .mockResolvedValue({ owner_id: userId + 1 });

    await expect(usecase.execute(productId, data, userId)).rejects.toThrow(
      'You are not allowed to update this product',
    );
  });

  it('should throw an error if the product name is already in use', async () => {
    const productId = 1;
    const userId = 1;
    const data: IUpdateProductRequest = { name: 'new_name', category_id: 1 };

    MockProductRepository.findOneBy = jest
      .fn()
      .mockResolvedValue({ owner_id: userId });
    MockProductRepository.findByNameAndOwnerId = jest
      .fn()
      .mockResolvedValue({ id: productId + 1 });

    await expect(usecase.execute(productId, data, userId)).rejects.toThrow(
      `The user has already created a product with the name "${data.name}"`,
    );
  });

  it('should throw an error if the category does not exist', async () => {
    const productId = 1;
    const userId = 1;
    const data: IUpdateProductRequest = { name: 'new_name', category_id: 1 };

    MockProductRepository.findOneBy = jest
      .fn()
      .mockResolvedValue({ owner_id: userId });
    MockProductRepository.findByNameAndOwnerId = jest
      .fn()
      .mockResolvedValue(null);
    MockCategoryRepository.findOneBy = jest.fn().mockResolvedValue(null);

    await expect(usecase.execute(productId, data, userId)).rejects.toThrow(
      'Category not found',
    );
  });
});
