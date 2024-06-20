import { BadRequestException } from '@nestjs/common';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';

import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';
import { MockUserPurchaseRepository } from '../../../../test/utils/mocks/repositories/userPurchaseRepository.mock';

import { BuyUseCase } from './buy.usecase';

describe('BuyUseCase', () => {
  let buyUseCase: BuyUseCase;
  let mockProductCartRepository: IProductCartRepository;
  let mockUserPurchaseRepository: IUserPurchaseRepository;

  const mockProducts = [
    { product_id: 1, product_unit_price: 100, quantity: 2 },
    { product_id: 2, product_unit_price: 200, quantity: 1 },
  ];

  beforeEach(async () => {
    buyUseCase = new BuyUseCase(
      MockProductCartRepository,
      MockUserPurchaseRepository,
    );
    mockProductCartRepository = MockProductCartRepository;
    mockUserPurchaseRepository = MockUserPurchaseRepository;
  });

  it('should be defined', () => {
    expect(buyUseCase).toBeDefined();
  });

  it('should throw an error if there are no products in the cart', async () => {
    jest
      .spyOn(mockProductCartRepository, 'findAllByUserId')
      .mockResolvedValueOnce([]);

    await expect(buyUseCase.execute(1)).rejects.toThrow(BadRequestException);
  });

  it('should execute the purchase if there are products in the cart', async () => {
    jest
      .spyOn(mockProductCartRepository, 'findAllByUserId')
      .mockResolvedValueOnce(mockProducts);
    jest
      .spyOn(mockUserPurchaseRepository, 'saveWithItems')
      .mockResolvedValueOnce({} as any);

    const result = await buyUseCase.execute(1);

    expect(result).toHaveProperty('message', 'Purchase completed');
    expect(result).toHaveProperty('purchase');
  });

  it('should calculate the total amount correctly', () => {
    const result = (buyUseCase as any).getTotalAmount(mockProducts);
    expect(result).toEqual(400);
  });

  it('should create purchase items correctly', () => {
    const result = (buyUseCase as any).getPurchaseItemsToBeCreated(
      mockProducts,
    );

    expect(result).toEqual([
      { product_id: 1, unit_price: 100, quantity: 2 },
      { product_id: 2, unit_price: 200, quantity: 1 },
    ]);
  });
});
