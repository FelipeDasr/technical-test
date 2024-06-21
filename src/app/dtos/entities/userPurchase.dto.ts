export interface IUserPurchase {
  id: number;
  total_amount: number;
  user_id: number;
  purchase_date: Date;
}

export interface IUserPurchaseSimpleData
  extends Omit<IUserPurchase, 'user_id'> {}
