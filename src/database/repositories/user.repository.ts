import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

import { IUserRepository } from 'src/app/dtos/repositories/user.repository.dto';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.findOne({ where: { email } });
  }
}
