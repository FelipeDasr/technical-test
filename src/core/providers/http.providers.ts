import { DatabaseModule } from 'src/app/modules/database/database.module';

import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';

export const httpProviders = [CreateUserUseCase];
export const httpImports = [DatabaseModule];
