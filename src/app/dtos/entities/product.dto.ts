import { ICategory } from './category.dto';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  category_id: number;
  owner_id: number;
  deleted_at: Date | null;
}

export interface IProductDetails
  extends Omit<IProduct, 'category_id' | 'owner_id'> {
  units_sold: number;
  category: Omit<ICategory, 'deleted_at' | 'description'>;
  owner: {
    id: number;
    name: string;
  };
}
