export interface IProductCart {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface ICartDetails {
  total_of_products: number;
  total_amount: number;
  products: {
    product_cart_id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      unit_price: number;
      category: string;
    };
  }[];
}
