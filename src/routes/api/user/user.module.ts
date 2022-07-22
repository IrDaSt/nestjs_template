import { UserEntity } from '@models/entities/mysql/User.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'

// TODO: Add image splitting example with image-processing.utils.ts
@Module({
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule {}
