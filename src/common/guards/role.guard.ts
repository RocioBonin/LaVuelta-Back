import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/users/enum/role.enum';

@Injectable()
export class RoleGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = (request as any).user;

    const hasRole = requiredRoles.some((role) => role === user?.role);

    if (!user || !hasRole) {
      throw new UnauthorizedException('No tienes los permisos adecuados.');
    }
    return true;
  }
}
