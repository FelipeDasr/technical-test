import { IPaginationQuery } from 'src/app/dtos/repositories';
import * as Joi from 'joi';

export const paginationRequestSchema = {
  limit: Joi.number().min(1).max(100).optional().default(10),
  page: Joi.number().min(1).optional().default(1),
};

export const paginationRequestValidator = Joi.object<IPaginationQuery>(
  paginationRequestSchema,
);
