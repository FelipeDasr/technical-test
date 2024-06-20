import { MockProductCartRepository } from '../../../../test/utils/mocks/repositories/productCartRepository.mock';
import { GetCartDetailsUsecase } from './getCartDetails.usecase';

describe('GetCartDetailsUseCase', () => {
  const getCartDetailsUseCase = new GetCartDetailsUsecase(
    MockProductCartRepository,
  );

  it('should be defined', () => {
    expect(getCartDetailsUseCase).toBeDefined();
  });

  it('should be ', async () => {
    const response = await getCartDetailsUseCase.execute(1);

    expect(response).toHaveProperty('total_of_products');
    expect(response).toHaveProperty('total_amount');
    expect(response).toHaveProperty('products');
  });
});
