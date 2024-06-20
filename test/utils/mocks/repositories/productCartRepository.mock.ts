import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

export const MockProductCartRepository = {
  save: jest.fn(),
  delete: jest.fn(),
  findByUserIdAndProductId: jest.fn(),
} as any as IProductCartRepository;
