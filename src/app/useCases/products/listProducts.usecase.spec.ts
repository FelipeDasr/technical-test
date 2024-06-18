import { MockProductRepository } from 'test/utils/mocks/repositories/productRepository.mock';
import { ListProductsUsecase } from './listProducts.usecase';

describe('ListProductsUseCase', () => {
  const listProductsUseCase = new ListProductsUsecase(MockProductRepository);

  it('should be defined', () => {
    expect(listProductsUseCase).toBeDefined();
  });
});
