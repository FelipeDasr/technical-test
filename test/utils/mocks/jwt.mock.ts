import { JwtService, JsonWebTokenError } from '@nestjs/jwt';

type TokenType = 'valid_token' | 'invalid_token';

export const MockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mocked_token'),
  verifyAsync: jest.fn().mockImplementation((token: TokenType) => {
    if (token === 'valid_token') {
      return { id: 1 };
    }

    throw new JsonWebTokenError('Invalid token');
  }),
} as any as JwtService;
