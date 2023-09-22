import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PostCheckTokenAuthService } from 'src/auth/services/post-check-token-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly postCheckTokenAuthService: PostCheckTokenAuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      this.throwUnauthorized();
    }
    try {
      const r =
        await this.postCheckTokenAuthService.getCheckTokenByToken(token);
      request['user'] = r;
    } catch (error) {
      this.throwUnauthorized();
    }
    return true;
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private throwUnauthorized(): never {
    throw new HttpException(
      '[PR01]-Requisição não autorizada',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
