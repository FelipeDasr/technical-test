import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const jwtSettings = { secret: process.env.APP_SECRET };

    try {
      const payload = await this.jwtService.verifyAsync(token, jwtSettings);

      if (!payload) {
        throw new UnauthorizedException();
      }

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromRequest(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
