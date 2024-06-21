import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

import { IUser, IUserWithoutPassword } from '../entities/user.dto';

export abstract class IUserRepository extends Repository<UserEntity> {
  public abstract findByEmail(
    email: string,
    selectPassword?: boolean,
  ): Promise<IUser | IUserWithoutPassword | null>;
}
