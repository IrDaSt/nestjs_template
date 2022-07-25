import { ServerConfigModel } from '@config/server.config'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import cryptoUtils from '@utilities/crypto.utils'
import idGeneratorUtils from '@utilities/id-generator.utils'

@Injectable()
export class JwtCustomService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(JwtCustomService.name)
  private readonly serverConfig =
    this.configService.get<ServerConfigModel>('server')

  generateToken = (data: any) => {
    const token = this.jwtService.sign(data)
    const encrypt_token = cryptoUtils.encryptWithSecretKey(
      token,
      this.serverConfig.secret_token,
    )
    return encrypt_token
  }

  verifyToken = (token: string) => {
    const decrypt_token = cryptoUtils.decryptWithSecretKey(
      token,
      this.serverConfig.secret_token,
    )
    return this.jwtService.verify(decrypt_token)
  }
}
