import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { IUserSignupRequest } from 'src/app/dtos/requests/users.requests.dto';

import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { userSignupRequestValidator } from 'src/core/validators/users/userSignup.validator';

import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUsecase: CreateUserUseCase) {}

  @Post('signup')
  public async signup(
    @Body(new ValidatorPipe(userSignupRequestValidator))
    body: IUserSignupRequest,
    @Res() response: Response,
  ) {
    const newUser = await this.createUserUsecase.execute(body);
    return response.status(201).json(newUser);
  }
}
