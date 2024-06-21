export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  deleted_at: Date | null;
}

export interface ICategoryDetails extends ICategory {
  total_of_products: number;
}
