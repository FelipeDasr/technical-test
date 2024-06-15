import { IUserRepository } from '../../../../src/app/dtos/repositories/user.repository.dto';
import { IUser } from 'src/app/dtos/entities/user.dto';

type mockedEmail = 'return_user' | 'return_null';

export const MockUserRepository: IUserRepository = {
  save: jest
    .fn()
    .mockImplementation(async (data: IUser) => ({ id: 1, ...data })),
  findByEmail: jest
    .fn()
    .mockImplementation(async (email: mockedEmail, withPassword?: boolean) => {
      switch (email) {
        case 'return_user':
          return {
            id: 1,
            email: 'user@email.com',
            name: 'user name',
            password: withPassword && 'password',
          };

        case 'return_null':
        default:
          return null;
      }
    }),
} as any as IUserRepository;
