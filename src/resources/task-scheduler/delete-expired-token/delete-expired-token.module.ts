import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GatewayModule } from '@websockets/gateway/gateway.module'
import { UserTokenModule } from 'src/routes/api/user-token/user-token.module'
import { DeleteExpiredTokenService } from './delete-expired-token.service'

@Module({
  providers: [DeleteExpiredTokenService],
  imports: [ConfigModule, GatewayModule, UserTokenModule],
})
export class DeleteExpiredTokenModule {}
