import { NotFoundException } from '@nestjs/common';

import { MockUserPurchaseRepository } from '../../../../test/utils/mocks/repositories/userPurchaseRepository.mock';

import { GetUserPurchaseDetailsUsecase } from './getUserPurchaseDetails.usecase';

jest.mock('src/app/dtos/repositories/userPurchase.repositoty.dto');

describe('GetUserPurchaseDetailsUsecase', () => {
  const getUserPurchaseDetailsUsecase = new GetUserPurchaseDetailsUsecase(
    MockUserPurchaseRepository,
  );

  it('should return purchase details when found', async () => {
    const mockPurchaseDetails = {
      id: 7,
      total_amount: 1600000,
      purchase_date: '2024-06-20T20:15:37.362Z',
      items: [
        {
          unit_price: 800000,
          quantity: 2,
          product: {
            id: 4,
            name: 'Iphone 14',
          },
        },
      ],
    };
    MockUserPurchaseRepository.findDetailsByIdAndUserId = jest
      .fn()
      .mockResolvedValue(mockPurchaseDetails);

    const result = await getUserPurchaseDetailsUsecase.execute(1, 1);

    expect(result).toEqual(mockPurchaseDetails);
    expect(
      MockUserPurchaseRepository.findDetailsByIdAndUserId,
    ).toHaveBeenCalledWith(1, 1);
  });

  it('should throw NotFoundException when purchase details are not found', async () => {
    MockUserPurchaseRepository.findDetailsByIdAndUserId = jest
      .fn()
      .mockResolvedValue(null);

    await expect(getUserPurchaseDetailsUsecase.execute(1, 1)).rejects.toThrow(
      NotFoundException,
    );
  });
});
