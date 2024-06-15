import { BadRequestException } from '@nestjs/common';

import { MockUserRepository } from '../../../../test/utils/mocks/repositories/userRepository.mock';

import { CreateUserUseCase } from './createUser.usecase';

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockReturnValue('valid_password'),
}));

describe('CreateUserUseCase', () => {
  const createUserUseCase = new CreateUserUseCase(MockUserRepository);

  it('should throw an error if user already exists', async () => {
    await expect(async () => {
      await createUserUseCase.execute({
        email: 'return_user',
        password: 'valid_password',
        name: 'valid_name',
      });
    }).rejects.toThrow(BadRequestException);
  });

  it('should create a new user', async () => {
    const userData = {
      email: 'return_null',
      password: 'valid_password',
      name: 'valid_name',
    };

    const result = await createUserUseCase.execute(userData);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('email');
  });
});
