import * as Joi from 'joi';

import { ICreateProductCartRequest } from 'src/core/dtos/requests/carts.request.dto';

export const createProductCartRequestValidator =
  Joi.object<ICreateProductCartRequest>({
    product_id: Joi.number().integer().positive().required(),
    quantity: Joi.number().required().integer().min(1),
  });
