export interface IProduct {
  id: number;
  name: string;
  description: string;
  unit_price: number;
  category_id: number;
  owner_id: number;
  deleted_at: Date | null;
}
