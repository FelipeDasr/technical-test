import { IUserRepository } from '../../../../src/app/dtos/repositories/user.repository.dto';

type mockedEmail = 'return_user' | 'return_null';

export const MockUserRepository: IUserRepository = {
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
