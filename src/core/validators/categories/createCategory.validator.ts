import * as Joi from 'joi';

import { ICreateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

export const createCategoryRequestValidator =
  Joi.object<ICreateCategoryRequest>({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(200).optional().allow(null),
  });
