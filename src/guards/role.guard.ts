import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/users/enum/role.enum";

@Injectable()
export class RoleGuards implements CanActivate {
    constructor(private readonly reflector: Reflector ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',
            [
                context.getHandler(),
                context.getClass(),
            ]);

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            const hasRole = () => {
                if(requiredRoles.includes(Role.Admin)){
                    return user.administrador === "admin"
                }
                return true;
            }

            const valid = user && hasRole();

            if(!valid){
                throw new UnauthorizedException('No tiene permiso para esta ruta')
            }

            return valid;
    }
}