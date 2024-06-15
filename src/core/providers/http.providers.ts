import { JwtService } from '@nestjs/jwt';

import { DatabaseModule } from 'src/app/modules/database/database.module';

import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';
import { GenerateUserAuthToken } from 'src/app/useCases/auth/generateUserAuthToken.usecase';

export const httpProviders = [
  JwtService,
  CreateUserUseCase,
  GenerateUserAuthToken,
];
export const httpImports = [DatabaseModule];
