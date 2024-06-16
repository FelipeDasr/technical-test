import { UnauthorizedException } from '@nestjs/common';

import { MockJwtService } from '../../../test/utils/mocks/jwt.mock';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const guard = new AuthGuard(MockJwtService);
  const getReqContext = (
    token: 'valid_token' | 'invalid_token' | 'not_exists',
  ) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              token === 'not_exists'
                ? undefined
                : token === 'valid_token'
                  ? 'Bearer valid_token'
                  : 'Bearer invalid_token',
          },
        }),
      }),
    }) as any;

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should be able to activate the guard', async () => {
    const canActivate = await guard.canActivate(getReqContext('valid_token'));
    expect(canActivate).toBe(true);
  });

  it('should throw an error when the token not exists', async () => {
    try {
      await guard.canActivate(getReqContext('not_exists'));
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should throw an error when the token is invalid', async () => {
    try {
      await guard.canActivate(getReqContext('invalid_token'));
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
    }
  });
});
