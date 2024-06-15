import { Module } from '@nestjs/common';

import { httpImports, httpProviders } from 'src/core/providers/http.providers';

import { UsersController } from './controllers/users.controller';

@Module({
  imports: httpImports,
  controllers: [UsersController],
  providers: httpProviders,
})
export class HttpModule {}
