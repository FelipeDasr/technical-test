export interface ICreateCategoryRequest {
  name: string;
  description: string | null;
}

export interface IUpdateCategoryRequest
  extends Partial<ICreateCategoryRequest> {}
