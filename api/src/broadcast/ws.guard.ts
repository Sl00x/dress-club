import { CanActivate, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from 'interfaces/request.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    const token = context.args[0].handshake.headers.authorization.split(' ')[1];
    if (!token) {
      return false;
    }
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET_SECURITY,
      });
      const user = await this.userService.findOne({
        where: { id: payload.sub },
      });
      if (user === null) {
        return false;
      }
      request.user = user;
    } catch {
      return false;
    }
    return true;
  }
}
