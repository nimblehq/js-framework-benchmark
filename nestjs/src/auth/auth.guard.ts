import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authCookie = request.cookies['_nest-newsletter'];

    if (!authCookie) {
      return false;
    }

    const userId = request.unsignCookie(authCookie)['value'];

    return this.isValidCurrentUser(userId);
  }

  private async isValidCurrentUser(userId) {
    const existingUser = await this.userService.find({ id: userId });

    return !!existingUser;
  }
}
