import { NotFoundException } from '@nestjs/common';

import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';

import { RemoveProductFromCartUseCase } from './removeProductFromCart.usecase';

describe('RemoveProductFromCartUseCase', () => {
  const removeProductFromCartUseCase = new RemoveProductFromCartUseCase(
    MockProductCartRepository,
  );

  const productCartId = 1;
  const userId = 2;

  it('should be defined', () => {
    expect(removeProductFromCartUseCase).toBeDefined();
  });

  it('should remove a product from a cart', async () => {
    jest
      .spyOn(MockProductCartRepository, 'delete')
      .mockResolvedValue({ affected: 1 } as any);

    const result = await removeProductFromCartUseCase.execute(
      productCartId,
      userId,
    );

    expect(result.message).toBe('Product removed from cart');
  });

  it('should not remove a product from a cart if it does not exist', async () => {
    jest
      .spyOn(MockProductCartRepository, 'delete')
      .mockResolvedValue({ affected: 0 } as any);

    try {
      await removeProductFromCartUseCase.execute(productCartId, userId);
    } catch (error) {
      expect(error.message).toBe('Product not found in cart');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
