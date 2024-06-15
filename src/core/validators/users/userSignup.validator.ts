import * as Joi from 'joi';

import { IUserSignupRequest } from '../../../app/dtos/requests/users.requests.dto';

export const userSignupRequestValidator = Joi.object<IUserSignupRequest>({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
