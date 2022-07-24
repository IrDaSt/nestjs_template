import { UserEntity } from '@models/entities/mysql/User.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from '../auth/auth.module'
import { TypeOrmCustomModule } from '@services/type-orm-custom/type-orm-custom.module'

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    TypeOrmCustomModule,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
