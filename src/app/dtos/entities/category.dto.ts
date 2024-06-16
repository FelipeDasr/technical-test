export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  deleted_at: Date | null;
}

export interface ICategoryRecord extends ICategory {
  id: number;
}
