import * as Joi from 'joi';

import { ICreateProductCartRequest } from 'src/app/dtos/requests/carts.request.dto';

export const createProductCartRequestValidator =
  Joi.object<ICreateProductCartRequest>({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().required().integer().min(1),
  });
