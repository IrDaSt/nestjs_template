import { Module } from '@nestjs/common'
import { JwtCustomModule } from '@services/jwt-custom/jwt-custom.module'
import { TypeOrmCustomModule } from '@services/type-orm-custom/type-orm-custom.module'
import { UserTokenModule } from '../user-token/user-token.module'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'

@Module({
  controllers: [AuthController],
  imports: [JwtCustomModule, UserModule, UserTokenModule, TypeOrmCustomModule],
})
export class AuthModule {}
