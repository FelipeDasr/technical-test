import * as Joi from 'joi';

import { IFindAllProductsQuery } from 'src/core/dtos/repositories/product.repository.dto';

import { paginationRequestSchema } from '../common/pagination.validator';

export const listProductsRequestValidator = Joi.object<IFindAllProductsQuery>({
  ...paginationRequestSchema,
  categories: Joi.array().items(Joi.number()).optional(),
  orderByPrice: Joi.string().valid('ASC', 'DESC').optional().default('DESC'),
  minPrice: Joi.number().min(1).default(1).optional(),
  maxPrice: Joi.number().min(Joi.ref('minPrice')).optional(),
});
