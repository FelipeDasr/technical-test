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
} as any as IProductRepository;
