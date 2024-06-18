import { ICategoryRepository } from 'src/app/dtos/repositories/category.repository.dto';
import { ICategory } from 'src/app/dtos/entities/category.dto';

type mockedCategory = 'return_category' | 'return_null';

export const MockCategoryRepository: ICategoryRepository = {
  save: jest.fn().mockImplementation(async (data: ICategory) => ({
    id: 1,
    ...data,
    deleted_at: null,
  })),
  findOne: jest.fn(),
  countActiveProducts: jest.fn(),
  findByName: jest
    .fn()
    .mockImplementation((name: mockedCategory): ICategory | null => {
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
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  findDetailsById: jest.fn().mockImplementation((id: number) => {
    if (id !== 1) {
      return null;
    }

    return {
      id: 1,
      name: 'valid_category',
      description: 'Category description',
      deleted_at: null,
      total_of_products: 0,
    };
  }),
} as any as ICategoryRepository;
