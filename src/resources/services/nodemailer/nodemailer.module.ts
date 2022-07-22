import { MailConfigModel } from '@config/mail.config'
import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { NodemailerService } from './nodemailer.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mailConfig = configService.get<MailConfigModel>('mail')
        return {
          transport:
            `smtps://${mailConfig.MAIL_USERNAME}:${mailConfig.MAIL_PASSWORD}` +
            `@${mailConfig.MAIL_HOST}`,
          defaults: {
            from: `${mailConfig.MAIL_FROM_NAME}`,
          },
          template: {
            dir: __dirname + '/../../views/emails',
            adapter: new EjsAdapter(),
            options: {
              strict: false,
            },
          },
        }
      },
    }),
  ],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
