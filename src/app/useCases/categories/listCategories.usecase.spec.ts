import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';
import { ListCategoriesUsecase } from './listCategories.usecase';

describe('listCategoriesUsecase', () => {
  const listCategoriesUsecase = new ListCategoriesUsecase(
    MockCategoryRepository,
  );

  it('should be able to list all categories', async () => {
    const categories = await listCategoriesUsecase.execute({
      page: 1,
      limit: 10,
    });

    expect(categories).toHaveProperty('total');
    expect(categories).toHaveProperty('data');
  });
});
