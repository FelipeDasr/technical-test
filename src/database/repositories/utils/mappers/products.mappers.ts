import { IProductDetails } from 'src/app/dtos/entities/product.dto';

export function mapProductDetails(data: any): IProductDetails {
  return {
    id: data.product_id,
    name: data.product_name,
    description: data.product_description,
    unit_price: data.product_unit_price,
    deleted_at: data.product_deleted_at,
    units_sold: Number(data.units_sold || 0),
    category: {
      id: data.category_id,
      name: data.category_name,
    },
    owner: {
      id: data.owner_id,
      name: data.owner_name,
    },
  };
}
