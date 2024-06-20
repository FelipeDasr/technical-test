import { NotFoundException } from '@nestjs/common';

import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';

import { UpdateProductCartUsecase } from './updateProductCart.usecase';

describe('UpdateProductCartUseCase', () => {
  const updateProductCartUseCase = new UpdateProductCartUsecase(
    MockProductCartRepository,
  );

  const userId = 1;
  const productCartId = 1;
  const data = { quantity: 2 };

  it('should be defined', () => {
    expect(updateProductCartUseCase).toBeDefined();
  });

  it('should update a product in the cart', async () => {
    const productCart = {
      id: 1,
      user_id: 1,
      product_id: 1,
      quantity: 1,
    };

    const saveProductCart = jest.spyOn(MockProductCartRepository, 'save');

    jest
      .spyOn(MockProductCartRepository, 'findOneBy')
      .mockResolvedValue(productCart as any);

    const result = await updateProductCartUseCase.execute(
      userId,
      productCartId,
      data,
    );

    expect(saveProductCart).toHaveBeenCalledWith(productCart);
    expect(productCart.quantity).toBe(data.quantity); // Updated value

    expect(result).toEqual({ message: 'Product cart updated' });
  });

  it('should throw an error if product cart not found', async () => {
    jest.spyOn(MockProductCartRepository, 'findOneBy').mockResolvedValue(null);

    try {
      await updateProductCartUseCase.execute(userId, productCartId, data);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Product cart not found');
    }
  });
});
