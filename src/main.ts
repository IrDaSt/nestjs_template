import { NestFactory } from '@nestjs/core'
import sharp from 'sharp'
import { AppModule } from './app.module'
import moment from 'moment'
import 'moment-timezone'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { ServerConfigModel } from '@config/server.config'
import morgan from 'morgan'
import { loggerHttp } from '@utilities/winston.utils'
import { ValidationPipe } from '@nestjs/common'
import { BadRequestExceptionFilter } from '@exceptions/bad-request-exception.filter'
import { InternalServerErrorFilter } from '@exceptions/internal-server-error.filter'
import { UnauthorizedExceptionFilter } from '@exceptions/unauthorized-exception.filter'
import { ForbiddenExceptionFilter } from '@exceptions/forbidden-exception.filter'
import { NotFoundExceptionFilter } from '@exceptions/not-found-exception.filter'
sharp.cache(false)

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)
  const serverConfig = configService.get<ServerConfigModel>('server')

  // Cross-origin resource sharing
  app.enableCors()
  // Use Morgan Logging system
  // Stream all request to console on dev mode
  if (serverConfig.node_env === 'development') {
    app.use(morgan('dev'))
  }
  // Stream logs to file
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => loggerHttp.info(message.trim()),
      },
    }),
  )

  app.setBaseViewsDir(__dirname + '/../src/resources/views')
  app.setViewEngine('ejs')

  // Validation pipes
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new BadRequestExceptionFilter())
  app.useGlobalFilters(new InternalServerErrorFilter())
  app.useGlobalFilters(new UnauthorizedExceptionFilter())
  app.useGlobalFilters(new ForbiddenExceptionFilter())
  app.useGlobalFilters(new NotFoundExceptionFilter())
  moment.tz.setDefault('Asia/Jakarta')

  // Extends Socket.io
  // const redisIoAdapter = new RedisIoAdapter(app)
  // await redisIoAdapter.connectToRedis()
  await app.listen(serverConfig.port)
}
bootstrap()
