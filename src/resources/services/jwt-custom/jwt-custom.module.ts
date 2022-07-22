import { ServerConfigModel } from '@config/server.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { JwtCustomService } from './jwt-custom.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const serverConfig = configService.get<ServerConfigModel>('server')
        return {
          secret: serverConfig.secret_token,
          signOptions: {
            expiresIn: '7d',
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtCustomService],
  exports: [JwtCustomService],
})
export class JwtCustomModule {}
