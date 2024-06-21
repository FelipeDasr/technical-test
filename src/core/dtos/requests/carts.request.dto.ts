export interface ICreateProductCartRequest {
  product_id: number;
  quantity: number;
}

export interface IUpdateProductCartRequest {
  quantity: number;
}
