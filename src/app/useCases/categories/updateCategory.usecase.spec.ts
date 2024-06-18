import { BadRequestException } from '@nestjs/common';
import { MockCategoryRepository } from '../../../../test/utils/mocks/repositories/categoryRepository.mock';
import { UpdateCategoryUsecase } from './updateCategory.usecase';

describe('UpdateCategoryUseCase', () => {
  const updateCategoryUseCase = new UpdateCategoryUsecase(
    MockCategoryRepository,
  );

  it('should be defined', () => {
    expect(updateCategoryUseCase).toBeDefined();
  });

  it('should update a category', async () => {
    jest
      .spyOn(MockCategoryRepository, 'update')
      .mockResolvedValue({ affected: 1 } as any);

    const category = await updateCategoryUseCase.execute(1, {
      name: 'return_null',
      description: 'Category description',
    });

    expect(category).toEqual({ message: 'Category updated successfully' });
  });

  it('should not update a category that does not exist', async () => {
    jest
      .spyOn(MockCategoryRepository, 'update')
      .mockResolvedValue({ affected: 0 } as any);

    try {
      await updateCategoryUseCase.execute(1, {
        name: 'return_null',
        description: 'Category description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(
        'Category not updated, verifiy if the category exists',
      );
    }
  });

  it('should not update a category with a name that is already in use', async () => {
    jest
      .spyOn(MockCategoryRepository, 'findByName')
      .mockResolvedValue({ id: 2 } as any);

    try {
      await updateCategoryUseCase.execute(1, {
        name: 'return_category',
        description: 'Category description',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Category name is already in use');
    }
  });
});
