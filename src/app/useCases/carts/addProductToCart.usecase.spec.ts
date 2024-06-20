import { NotFoundException } from '@nestjs/common';

import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';
import { MockProductRepository } from '../../../../test/utils/mocks/repositories/productRepository.mock';

import { AddProductToCartUseCase } from './addProductToCart.usecase';

describe('AddProductToCartUseCase', () => {
  const addProductToCartUseCase = new AddProductToCartUseCase(
    MockProductCartRepository,
    MockProductRepository,
  );

  const userId = 1;
  const productId = 2;
  const quantity = 3;

  it('should be defined', () => {
    expect(addProductToCartUseCase).toBeDefined();
  });

  it('should be able to add a product to the cart', async () => {
    jest.spyOn(MockProductRepository, 'existsBy').mockResolvedValue(true);
    jest
      .spyOn(MockProductCartRepository, 'findByUserIdAndProductId')
      .mockResolvedValue(null);

    const result = await addProductToCartUseCase.execute(
      userId,
      productId,
      quantity,
    );

    expect(result).toHaveProperty('message');
    expect(result.message).toBe('Product added to cart');
  });

  it('must be able to add a product that has already been added to the cart', async () => {
    const productCart = {
      id: 1,
      user_id: userId,
      product_id: productId,
      quantity: 1,
    };

    jest.spyOn(MockProductRepository, 'existsBy').mockResolvedValue(true);
    jest
      .spyOn(MockProductCartRepository, 'findByUserIdAndProductId')
      .mockResolvedValue(productCart);

    const saveProductCart = jest.spyOn(MockProductCartRepository, 'save');

    const result = await addProductToCartUseCase.execute(
      userId,
      productId,
      quantity,
    );

    expect(saveProductCart).toHaveBeenCalled();
    expect(saveProductCart).toHaveBeenCalledWith(productCart);
    expect(productCart.quantity).toBe(4); // 1 + 3 (added quantity)

    expect(result).toHaveProperty('message');
    expect(result.message).toBe('Product added to cart');
  });

  it('should not be able to add a product that does not exist', async () => {
    jest.spyOn(MockProductRepository, 'existsBy').mockResolvedValue(false);

    try {
      await addProductToCartUseCase.execute(userId, productId, quantity);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Product not found');
    }
  });
});
