import { Module } from '@nestjs/common'
import { BaseGateway } from './base.gateway'

@Module({
  providers: [BaseGateway],
  exports: [BaseGateway],
})
export class GatewayModule {}
