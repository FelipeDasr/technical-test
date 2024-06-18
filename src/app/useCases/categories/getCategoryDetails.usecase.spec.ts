import { NotFoundException } from '@nestjs/common';

import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';
import { GetCategoryDetailsUsecase } from './getCategoryDetails.usecase';

describe('GetCategoryDetailsUsecase', () => {
  const getCategoryDetailsUsecase = new GetCategoryDetailsUsecase(
    MockCategoryRepository,
  );

  it('should be defined', async () => {
    expect(getCategoryDetailsUsecase).toBeDefined();
  });

  it('should return a category', async () => {
    const category = await getCategoryDetailsUsecase.execute(1);

    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('name');
    expect(category).toHaveProperty('description');
    expect(category).toHaveProperty('deleted_at');
    expect(category).toHaveProperty('total_of_products');
  });

  it('should throw an error when category does not exist', async () => {
    try {
      await getCategoryDetailsUsecase.execute(2);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Category not found');
    }
  });
});
