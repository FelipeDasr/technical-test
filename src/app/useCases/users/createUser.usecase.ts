import { BadRequestException, Injectable } from '@nestjs/common';

import { IUserRepository } from 'src/core/dtos/repositories/user.repository.dto';

import { IUserSignupRequest } from 'src/core/dtos/requests/users.requests.dto';
import { IUserWithoutPassword } from 'src/core/dtos/entities/user.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    data: IUserSignupRequest,
  ): Promise<IUserWithoutPassword> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new BadRequestException('User email is already in use');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 8);
    const newUser = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    // Remove password from response
    newUser.password = undefined;
    return newUser;
  }
}
