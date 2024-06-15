import { UnauthorizedException } from '@nestjs/common';

import { MockUserRepository } from '../../../../test/utils/mocks/repositories/userRepository.mock';
import { MockJwtService } from '../../../../test/utils/mocks/jwt.mock';

import { GenerateUserAuthTokenUsecase } from './generateUserAuthToken.usecase';

jest.mock('bcryptjs', () => ({
  compareSync: jest
    .fn()
    .mockImplementation(
      (a: 'valid_password' | 'invalid_password', b: string) =>
        b && a === 'valid_password' ? true : false,
    ),
}));

describe('generateUserAuthToken', () => {
  const generateUserAuthToken = new GenerateUserAuthTokenUsecase(
    MockUserRepository,
    MockJwtService,
  );

  it('should throw an error if the user does not exist', async () => {
    await expect(
      generateUserAuthToken.execute({
        email: 'return_null',
        password: 'valid_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw an error if the password is incorrect', async () => {
    await expect(
      generateUserAuthToken.execute({
        email: 'return_user',
        password: 'invalid_password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return the user and the token if the user exists and the password is correct', async () => {
    const response = await generateUserAuthToken.execute({
      email: 'return_user',
      password: 'valid_password',
    });

    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
  });
});
