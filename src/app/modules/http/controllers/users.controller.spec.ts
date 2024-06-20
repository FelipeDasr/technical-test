import { Response } from 'express';
import { CreateUserUseCase } from 'src/app/useCases/users/createUser.usecase';
import { GenerateUserAuthTokenUsecase } from 'src/app/useCases/auth/generateUserAuthToken.usecase';
import { UsersController } from 'src/app/modules/http/controllers/users.controller';

import { MockUserRepository } from '../../../../../test/utils/mocks/repositories/userRepository.mock';
import { MockJwtService } from '../../../../../test/utils/mocks/jwt.mock';

jest.mock('src/app/useCases/users/createUser.usecase');
jest.mock('src/app/useCases/auth/generateUserAuthToken.usecase');

describe('UsersController', () => {
  const mockCreateUserUseCase = new CreateUserUseCase(
    MockUserRepository,
  ) as jest.Mocked<CreateUserUseCase>;
  const mockGenerateUserAuthTokenUsecase = new GenerateUserAuthTokenUsecase(
    MockUserRepository,
    MockJwtService,
  ) as jest.Mocked<GenerateUserAuthTokenUsecase>;
  const usersController = new UsersController(
    mockCreateUserUseCase,
    mockGenerateUserAuthTokenUsecase,
  );

  it('should signup a new user', async () => {
    const mockUser = { id: '1', email: 'test@test.com', name: 'Test User' };
    const mockReq = {
      body: { email: 'test@test.com', password: 'password', name: 'Test User' },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    mockCreateUserUseCase.execute.mockResolvedValue(mockUser as any);

    await usersController.signup(mockReq.body, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  it('should signin a user', async () => {
    const mockAuthData = {
      token: 'token',
      user: { id: '1', email: 'test@test.com', name: 'Test User' },
    };
    const mockReq = { body: { email: 'test@test.com', password: 'password' } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    mockGenerateUserAuthTokenUsecase.execute.mockResolvedValue(
      mockAuthData as any,
    );

    await usersController.signin(mockReq.body, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockAuthData);
  });
});
