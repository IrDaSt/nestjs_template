import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}

  sendCustomEmail({
    from_desc,
    to_email,
    subject,
    html,
  }: {
    from_desc: string
    to_email: string
    subject: string
    html: string
  }) {
    return this.mailerService.sendMail({
      from: from_desc,
      to: to_email,
      subject: subject,
      html: html,
    })
  }
}
