import { IProductRepository } from 'src/app/dtos/repositories/product.repository.dto';
import { IProduct } from 'src/app/dtos/entities/product.dto';

type ReturnType = 'return_product' | 'return_null';

export const MockProductRepository = {
  save: jest.fn().mockImplementation((product: IProduct): IProduct => {
    return {
      id: 1,
      name: product.name,
      category_id: product.category_id,
      owner_id: product.owner_id,
      deleted_at: null,
      description: product.description,
      unit_price: product.unit_price,
    };
  }),
  softDelete: jest.fn(),
  existsBy: jest.fn(),
  findByNameAndOwnerId: jest
    .fn()
    .mockImplementation(
      (name: ReturnType, ownerId: number): IProduct | null => {
        if (name === 'return_product') {
          return {
            id: 1,
            name: 'Product Name',
            category_id: 1,
            owner_id: ownerId,
            deleted_at: null,
            description: 'Product description',
            unit_price: 10,
          };
        }

        return null;
      },
    ),
  findDetailsById: jest.fn().mockImplementation((id: number) => {
    if (id !== 1) return null;

    return {
      id: 1,
      name: 'valid_product',
      description: 'valid_description',
      unit_price: 111,
      deleted_at: null,
      units_sold: 0,
      category: {
        id: 4,
        name: 'valid_category',
      },
      owner: {
        id: 4,
        name: 'owner_name',
      },
    };
  }),
} as any as IProductRepository;
