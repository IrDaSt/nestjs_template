import MailConfig from '@config/mail.config'
import MysqlConfig from '@config/mysql.config'
import ServerConfig from '@config/server.config'
import PgConfig from '@config/pg.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiModule } from './routes/api/api.module'
import { TypeOrmCustomModule } from '@services/type-orm-custom/type-orm-custom.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TaskSchedulerModule } from '@task-scheduler/task-scheduler.module'
import { GatewayModule } from '@websockets/gateway/gateway.module'
import { NodemailerModule } from '@services/nodemailer/nodemailer.module'
import { WebModule } from './routes/web/web.module'
import { BaseGateway } from '@websockets/gateway/base.gateway'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      expandVariables: true,
      load: [ServerConfig, MysqlConfig, MailConfig, PgConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: __dirname + '/../public',
    }),
    ApiModule,
    TypeOrmCustomModule,
    ScheduleModule.forRoot(),
    TaskSchedulerModule,
    GatewayModule,
    NodemailerModule,
    WebModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseGateway],
})
export class AppModule {}
