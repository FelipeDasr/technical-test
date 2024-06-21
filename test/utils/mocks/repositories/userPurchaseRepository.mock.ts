import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';

export const MockUserPurchaseRepository = {
  saveWithItems: jest.fn(),
  findDetailsByIdAndUserId: jest.fn(),
  findAllByUserId: jest.fn(),
} as any as IUserPurchaseRepository;
