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

export interface IProductSimpleDetails
  extends Omit<IProduct, 'category_id' | 'owner_id'> {
  category: Omit<ICategory, 'deleted_at' | 'description'>;
}

export interface IProductDetails extends IProductSimpleDetails {
  units_sold: number;
  owner: {
    id: number;
    name: string;
  };
}
