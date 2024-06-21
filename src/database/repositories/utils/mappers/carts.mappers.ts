import {
  ICartDetails,
  IProductCartSimpleData,
} from 'src/core/dtos/entities/productCart.dto';
import { PurchaseItemEntity } from 'src/database/entities/purchaseItem.entity';
import { UserPurchaseEntity } from 'src/database/entities/userPurchase.entity';

export function mapCartDetails(data: any[]): ICartDetails {
  if (!data.length) {
    return {
      total_of_products: 0,
      total_amount: 0,
      products: [],
    };
  }

  const total_of_products = data.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const total_amount = data.reduce(
    (acc, product) => acc + product.product.unit_price * product.quantity,
    0,
  );

  return {
    total_of_products,
    total_amount,
    products: data.map((product) => ({
      product_cart_id: product.id,
      quantity: product.quantity,
      product: {
        id: product.product.id,
        name: product.product.name,
        unit_price: product.product.unit_price,
        category: product.product.category.name,
      },
    })),
  };
}

export function mapArrayOfCartSimpleData(
  data: any[],
): IProductCartSimpleData[] {
  return data.map((product) => ({
    product_id: product.product_id,
    product_unit_price: product.product.unit_price,
    quantity: product.quantity,
  }));
}

export function mapItemsToPurchaseItemEntity(
  data: any[],
  userPurchase: UserPurchaseEntity,
) {
  return data.map((item) => {
    const purchaseItem = new PurchaseItemEntity();
    purchaseItem.product_id = item.product_id;
    purchaseItem.quantity = item.quantity;
    purchaseItem.unit_price = item.unit_price;
    purchaseItem.purchase = userPurchase;

    return purchaseItem;
  });
}
