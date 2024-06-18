import * as Joi from 'joi';

import { IUpdateProductRequest } from 'src/app/dtos/requests/products.request.dto';

export const updateProductRequestValidator = Joi.object<IUpdateProductRequest>({
  name: Joi.string().max(100).optional(),
  description: Joi.string().max(200).optional(),
  category_id: Joi.number().optional(),
  unit_price: Joi.number().optional(),
}).min(1);
