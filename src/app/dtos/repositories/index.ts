export interface IEntityCollection<T> {
  total: number;
  data: T[];
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
}
