import * as Joi from 'joi';

import { IUpdateCategoryRequest } from 'src/core/dtos/requests/categories.request.dto';

export const updateCategoryRequestValidator =
  Joi.object<IUpdateCategoryRequest>({
    name: Joi.string().max(100).optional(),
    description: Joi.string().max(200).optional().allow(null),
  }).min(1);
