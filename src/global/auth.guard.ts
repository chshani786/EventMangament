import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';
import { Reflector } from '@nestjs/core';
import { BYPASS_KEY } from '../decorators/bypass.auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private defaultApp: any;

  constructor(private reflector: Reflector) {
    this.defaultApp = FirebaseService.defaultApp;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      BYPASS_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (token != null && token != '') {
      return this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
            uid: decodedToken.uid,
          };
          return true;
        })
        .catch(() => {
          throw new ForbiddenException(
            'Token expired, please refresh your firebase token!',
          );
        });
    } else {
      throw new UnauthorizedException('Authentication Token is required!');
    }
  }
}
