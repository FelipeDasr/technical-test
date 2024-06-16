import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { ICategory, ICategoryRecord } from 'src/app/dtos/entities/category.dto';

type mockedCategory = 'return_category' | 'return_null';

export const MockCategoryRepository: ICategoryRepository = {
  save: jest.fn().mockImplementation(async (data: ICategory) => ({
    id: 1,
    ...data,
    deleted_at: null,
  })),
  findByName: jest
    .fn()
    .mockImplementation((name: mockedCategory): ICategoryRecord | null => {
      switch (name) {
        case 'return_category':
          return {
            id: 1,
            name: 'valid_category',
            description: 'Category description',
            deleted_at: null,
          };

        case 'return_null':
        default:
          return null;
      }
    }),
  findAll: jest.fn().mockResolvedValue({
    total: 1,
    data: [
      {
        id: 1,
        name: 'valid_category',
        description: 'Category description',
        deleted_at: null,
      },
    ],
  }),
} as any as ICategoryRepository;
