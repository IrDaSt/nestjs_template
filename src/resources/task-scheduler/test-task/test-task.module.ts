import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GatewayModule } from '@websockets/gateway/gateway.module'
import { TestTaskService } from './test-task.service'

@Module({
  providers: [TestTaskService],
  imports: [ConfigModule, GatewayModule],
})
export class TestTaskModule {}
