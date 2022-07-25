import { UserEntity } from '@models/entities/mysql/User.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmCustomModule } from '@services/type-orm-custom/type-orm-custom.module'
import { JwtCustomModule } from '@services/jwt-custom/jwt-custom.module'

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmCustomModule,
    JwtCustomModule,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
