import { ServerConfigModel } from '@config/server.config'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron } from '@nestjs/schedule'
import { loggerConsole } from '@utilities/winston.utils'
import { BaseGateway } from '@websockets/gateway/base.gateway'
import { UserTokenService } from 'src/routes/api/user-token/user-token.service'

@Injectable()
export class DeleteExpiredTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly baseGateway: BaseGateway,
    private readonly userTokenService: UserTokenService,
  ) {}

  private readonly logger = new Logger(DeleteExpiredTokenService.name)
  private readonly serverConfig =
    this.configService.get<ServerConfigModel>('server')

  @Cron('0 0 0 * * *', {
    name: 'deleteExpiredTokenDaily',
    timeZone: 'Asia/Jakarta',
  })
  async deleteExpiredTokenDaily() {
    // if (this.serverConfig.node_env !== 'production') return
    await this.userTokenService.deleteAllExpiredUserToken()
    loggerConsole.info('Deleted expired token')
    this.logger.log('Deleted expired token')
  }
}
