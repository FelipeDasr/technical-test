import { BadRequestException, NotFoundException } from '@nestjs/common';

import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';
import { DeleteCategoryUseCase } from './deleteCategory.usecase';

describe('DeleteCategoryUsecase', () => {
  const deleteCategoryUsecase = new DeleteCategoryUseCase(
    MockCategoryRepository,
  );

  const validCategory = {
    id: 1,
    name: 'valid_category',
    description: 'Category description',
    deleted_at: null,
  } as any;

  const mockRepositoryFunction = (
    functionName: keyof typeof MockCategoryRepository,
    value: any,
  ) => {
    jest
      .spyOn(MockCategoryRepository, functionName as any)
      .mockResolvedValue(value);
  };

  it('should be defined', async () => {
    expect(deleteCategoryUsecase).toBeDefined();
  });

  it('should delete a category', async () => {
    // Return a valid category
    mockRepositoryFunction('findOne', validCategory);

    // Return 0 active products (0 is required to delete a category)
    mockRepositoryFunction('countActiveProducts', 0);

    const category = await deleteCategoryUsecase.execute(1);
    expect(category).toEqual({ message: 'Category deleted successfully' });
  });

  it('should throw an error if category does not exist', async () => {
    // Return null when searching for a category
    mockRepositoryFunction('findOne', null);

    try {
      await deleteCategoryUsecase.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Category not found');
    }
  });

  it('should throw an error if category has active products', async () => {
    // Return a valid category
    mockRepositoryFunction('findOne', validCategory);

    // Return 1 active product (1 is the min required to throw an error)
    mockRepositoryFunction('countActiveProducts', 1);

    try {
      await deleteCategoryUsecase.execute(1);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Category has active products');
    }
  });
});
