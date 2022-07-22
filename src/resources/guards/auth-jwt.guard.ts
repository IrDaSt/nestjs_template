import { CustomExpressRequest } from '@custom-types/custom-express-request.type'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtCustomService } from '@services/jwt-custom/jwt-custom.service'
import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(private readonly jwtCustomService: JwtCustomService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomExpressRequest>()
    const authorization = request.headers.authorization
    if (!authorization)
      throw new UnauthorizedException({
        message: 'Please provide a bearer token authorization',
      })
    try {
      const token = authorization.split(' ')[1]
      const user_data = this.jwtCustomService.verifyToken(token)
      request.currentUser = user_data
      request.token = token
      return true
    } catch (error) {
      throw new ForbiddenException({
        message: 'Failed to authenticate token',
      })
    }
  }
}
