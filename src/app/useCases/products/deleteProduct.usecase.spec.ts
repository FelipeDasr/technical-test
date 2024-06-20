import { NotFoundException } from '@nestjs/common';

import { MockProductRepository } from '../../../../test/utils/mocks/repositories/productRepository.mock';
import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';

import { DeleteProductUseCase } from './deleteProduct.usecase';

describe('DeleteProductUseCase', () => {
  const deleteProductUseCase = new DeleteProductUseCase(
    MockProductRepository,
    MockProductCartRepository,
  );

  const ownerId = 1;
  const productId = 2;

  it('should be defined', () => {
    expect(deleteProductUseCase).toBeDefined();
  });

  it('should be able to delete a product', async () => {
    const productSoftDelete = jest
      .spyOn(MockProductRepository, 'softDelete')
      .mockResolvedValue({ affected: 1 } as any);

    jest
      .spyOn(MockProductCartRepository, 'delete')
      .mockResolvedValue(undefined);

    const response = await deleteProductUseCase.execute(productId, ownerId);

    expect(response).toEqual({ message: 'Product deleted successfully' });
    expect(productSoftDelete).toHaveBeenCalledWith({
      id: productId,
      owner_id: ownerId,
    });
  });

  it('should not be able to delete a product that does not exist', async () => {
    jest
      .spyOn(MockProductRepository, 'softDelete')
      .mockResolvedValue({ affected: 0 } as any);

    try {
      await deleteProductUseCase.execute(productId, ownerId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Product not found');
    }
  });
});
