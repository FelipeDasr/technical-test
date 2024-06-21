import * as Joi from 'joi';

import { IUserSigninRequest } from '../../dtos/requests/users.requests.dto';

export const userSigninRequestValidator = Joi.object<IUserSigninRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
