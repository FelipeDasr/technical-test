import * as Joi from 'joi';

import { ICreateProductRequest } from 'src/core/dtos/requests/products.request.dto';

export const createProductRequestValidator = Joi.object<ICreateProductRequest>({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(200).required(),
  category_id: Joi.number().required(),
  unit_price: Joi.number().required(),
});
