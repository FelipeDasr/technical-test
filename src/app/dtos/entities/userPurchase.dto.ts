export interface IUserPurchase {
  id: number;
  total_amount: number;
  user_id: number;
  purchase_date: Date;
}

export interface IUserPurchaseSimpleData
  extends Omit<IUserPurchase, 'user_id'> {}

export interface IUserPurchaseWithItems extends Omit<IUserPurchase, 'user_id'> {
  items: {
    unit_price: number;
    quantity: number;
    product: {
      id: number;
      name: string;
    };
  }[];
}
