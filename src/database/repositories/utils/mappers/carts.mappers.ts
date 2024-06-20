import { ICartDetails } from 'src/app/dtos/entities/productCart.dto';

export function mapCartDetails(data: any[]): ICartDetails {
  if (!data.length) {
    return {
      total_of_products: 0,
      total_amount: 0,
      products: [],
    };
  }

  const total_of_products = data.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const total_amount = data.reduce(
    (acc, product) => acc + product.product.unit_price * product.quantity,
    0,
  );

  return {
    total_of_products,
    total_amount,
    products: data.map((product) => ({
      product_cart_id: product.id,
      quantity: product.quantity,
      product: {
        id: product.product.id,
        name: product.product.name,
        unit_price: product.product.unit_price,
        category: product.product.category.name,
      },
    })),
  };
}
