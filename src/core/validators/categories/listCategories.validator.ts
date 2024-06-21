import { IFindAllCategoriesQuery } from 'src/core/dtos/repositories/category.repository.dto';
import * as Joi from 'joi';

import { paginationRequestSchema } from '../common/pagination.validator';

export const listCategoriesRequestValidator =
  Joi.object<IFindAllCategoriesQuery>({
    ...paginationRequestSchema,
    includeDeleted: Joi.boolean().optional().default(false),
  });
