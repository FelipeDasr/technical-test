import * as Joi from 'joi';

import { IUpdateProductCartRequest } from 'src/app/dtos/requests/carts.request.dto';

export const updateProductCartRequestValidator =
  Joi.object<IUpdateProductCartRequest>({
    quantity: Joi.number().required().integer().min(1),
  });
