import { JwtService } from '@nestjs/jwt';

export const MockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mocked_token'),
} as any as JwtService;
