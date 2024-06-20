import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';

export const MockProductCartRepository = {
  save: jest.fn(),
  delete: jest.fn(),
  findByUserIdAndProductId: jest.fn(),
  findOneBy: jest.fn(),
  findCartDetailsByUserId: jest.fn().mockResolvedValue({
    total_of_products: 1,
    total_amount: 800000,
    products: [
      {
        product_cart_id: 18,
        quantity: 1,
        product: {
          id: 4,
          name: 'Iphone 14',
          unit_price: 800000,
          category: 'Smartphones',
        },
      },
    ],
  }),
} as any as IProductCartRepository;
