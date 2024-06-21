import { MockUserPurchaseRepository } from '../../../../test/utils/mocks/repositories/userPurchaseRepository.mock';

import { ListUserPurchasesUseCase } from './listUserPurchases.usecase';

describe('ListUserPurchasesUseCase', () => {
  const listUserPurchasesUseCase = new ListUserPurchasesUseCase(
    MockUserPurchaseRepository,
  );

  it('should call findAllByUserId with correct parameters', async () => {
    const userId = 1;
    const pagination = { page: 1, limit: 10 };

    await listUserPurchasesUseCase.execute(userId, pagination);
    expect(MockUserPurchaseRepository.findAllByUserId).toHaveBeenCalledWith(
      userId,
      pagination,
    );
  });

  it('should return the expected result', async () => {
    const userId = 1;
    const pagination = { page: 1, limit: 10 };
    const expectedPurchases = {
      total: 5,
      data: [
        {
          id: 10,
          total_amount: 500000,
          purchase_date: '2024-06-20T20:45:59.149Z',
        },
      ],
    };

    MockUserPurchaseRepository.findAllByUserId = jest
      .fn()
      .mockResolvedValue(expectedPurchases);

    const result = await listUserPurchasesUseCase.execute(userId, pagination);
    expect(result).toEqual(expectedPurchases);
  });
});
