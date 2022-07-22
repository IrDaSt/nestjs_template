import { ServerConfigModel } from '@config/server.config'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { BaseGateway } from '@websockets/gateway/base.gateway'

@Injectable()
export class TestTaskService {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseGateway: BaseGateway,
  ) {}

  private readonly logger = new Logger(TestTaskService.name)
  private readonly serverConfig =
    this.configService.get<ServerConfigModel>('server')

  @Cron('*/5 * * * * *', {
    name: 'test5Second',
    timeZone: 'Asia/Jakarta',
  })
  async test5Second() {
    // if (this.serverConfig.node_env !== 'production') return
    // this.logger.log('5 seconds passed')
    // this.baseGateway.socketioserver.emit('5-second')
  }
}
