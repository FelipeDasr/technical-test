import { BadRequestException } from '@nestjs/common';

import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';

import { CreateCategoryUsecase } from './createCategory.usecase';

describe('createCategoryUsecase', () => {
  const createCategoryUsecase = new CreateCategoryUsecase(
    MockCategoryRepository,
  );

  it('should be able to create a new category', async () => {
    const category = {
      name: 'return_null',
      description: 'Category Description Test',
    };

    const createdCategory = await createCategoryUsecase.execute(category);

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory.name).toEqual(category.name);
    expect(createdCategory.description).toEqual(category.description);
  });

  it('should throw an error if the category already exists', async () => {
    await expect(async () => {
      await createCategoryUsecase.execute({
        name: 'return_category',
        description: 'Category that already exists',
      });
    }).rejects.toThrow(BadRequestException);
  });
});
