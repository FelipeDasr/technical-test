import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  IUserSigninRequest,
  IUserSignupRequest,
} from 'src/core/dtos/requests/users.requests.dto';

import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { userSigninRequestValidator } from 'src/core/validators/users/userSignin.validator';
import { userSignupRequestValidator } from 'src/core/validators/users/userSignup.validator';

import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';
import { GenerateUserAuthTokenUsecase } from 'src/app/useCases/auth/generateUserAuthToken.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUsecase: CreateUserUseCase,
    private readonly generateUserAuthTokenUsecase: GenerateUserAuthTokenUsecase,
  ) {}

  @Post('signup')
  public async signup(
    @Body(new ValidatorPipe(userSignupRequestValidator))
    body: IUserSignupRequest,
    @Res() response: Response,
  ) {
    const newUser = await this.createUserUsecase.execute(body);
    return response.status(201).json(newUser);
  }

  @Post('signin')
  public async signin(
    @Body(new ValidatorPipe(userSigninRequestValidator))
    body: IUserSigninRequest,
    @Res() response: Response,
  ) {
    const userAuthData = await this.generateUserAuthTokenUsecase.execute(body);
    return response.status(200).json(userAuthData);
  }
}
