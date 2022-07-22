import { UserTokenEntity } from '@models/entities/mysql/UserToken.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserTokenService } from './user-token.service'

@Module({
  providers: [UserTokenService],
  imports: [TypeOrmModule.forFeature([UserTokenEntity])],
  exports: [UserTokenService],
})
export class UserTokenModule {}
