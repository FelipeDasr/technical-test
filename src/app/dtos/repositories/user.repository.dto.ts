import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

import { IUser } from '../entities/user.dto';

export abstract class IUserRepository extends Repository<UserEntity> {
  public abstract findByEmail(email: string): Promise<IUser | null>;
}
