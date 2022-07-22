import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import idGeneratorUtils from '@utilities/id-generator.utils'

@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken = (data: any) => {
    const token = this.jwtService.sign(data)
    const tokenize =
      token.substring(0, 40) +
      idGeneratorUtils.generateUUIDV4().slice(-15) +
      token.substring(40)
    return tokenize
  }

  verifyToken = (token: string) => {
    return this.jwtService.verify(
      token.substring(0, 40) + token.substring(40 + 15),
    )
  }
}
