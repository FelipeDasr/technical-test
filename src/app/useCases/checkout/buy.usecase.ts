import { BadRequestException, Injectable } from '@nestjs/common';

import { IProductCartRepository } from 'src/app/dtos/repositories/productCart.repository.dto';
import { IUserPurchaseRepository } from 'src/app/dtos/repositories/userPurchase.repositoty.dto';
import { IProductCartSimpleData } from 'src/app/dtos/entities/productCart.dto';

@Injectable()
export class BuyUseCase {
  constructor(
    private readonly productCartRepository: IProductCartRepository,
    private readonly userPurchaseRepository: IUserPurchaseRepository,
  ) {}

  public async execute(userId: number) {
    const products = await this.productCartRepository.findAllByUserId(userId);
    if (!products.length) throw new BadRequestException('No products in cart');

    const purchaseTotalAmount = this.getTotalAmount(products);
    const puchaseItems = this.getPurchaseItemsToBeCreated(products);

    const [userPurchase] = await Promise.all([
      this.userPurchaseRepository.saveWithItems(
        userId,
        purchaseTotalAmount,
        puchaseItems,
      ),
      // Delete all products from cart
      await this.productCartRepository.delete({ user_id: userId }),
    ]);

    return {
      message: 'Purchase completed',
      purchase: userPurchase,
    };
  }

  private getTotalAmount(products: IProductCartSimpleData[]) {
    return products.reduce(
      (acc, product) => acc + product.product_unit_price * product.quantity,
      0,
    );
  }

  private getPurchaseItemsToBeCreated(products: IProductCartSimpleData[]) {
    return products.map(({ product_id, product_unit_price, quantity }) => ({
      product_id,
      quantity,
      unit_price: product_unit_price,
    }));
  }
}
