import { IProduct } from '../entities/product.dto';

export interface ICreateProductRequest
  extends Omit<IProduct, 'id' | 'owner_id' | 'deleted_at'> {}
