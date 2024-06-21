import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/core/dtos/entities/user.dto';

import { IUserRepository } from 'src/core/dtos/repositories/user.repository.dto';

import { IUserSigninRequest } from 'src/core/dtos/requests/users.requests.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class GenerateUserAuthTokenUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async execute(data: IUserSigninRequest) {
    const user = (await this.userRepository.findByEmail(
      data.email,
      true,
    )) as IUser | null;

    if (!user || !bcrypt.compareSync(data.password, user?.password)) {
      throw new UnauthorizedException("User's email or password is incorrect");
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '1d', secret: process.env.APP_SECRET },
    );

    user.password = undefined;
    return { user, token };
  }
}
