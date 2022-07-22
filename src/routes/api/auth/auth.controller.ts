import { CustomExpressRequest } from '@custom-types/custom-express-request.type'
import { AuthJwtGuard } from '@guards/auth-jwt.guard'
import { UserEntity } from '@models/entities/mysql/User.entity'
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { JwtCustomService } from '@services/jwt-custom/jwt-custom.service'
import { TypeOrmCustomService } from '@services/type-orm-custom/type-orm-custom.service'
import cryptoUtils from '@utilities/crypto.utils'
import responsesUtils from '@utilities/responses.utils'
import { Response, Request } from 'express'
import moment from 'moment'
import prefixApi from '../prefixApi'
import { UserTokenService } from '../user-token/user-token.service'
import { UserService } from '../user/user.service'
import { LoginBodyDto } from './dto/LoginBody.dto'
import { RegisterBodyDto } from './dto/RegisterBody.dto'

@Controller(prefixApi.api + 'auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtCustomService: JwtCustomService,
    private readonly userTokenService: UserTokenService,
    private readonly typeOrmCustomService: TypeOrmCustomService,
  ) {}

  private readonly logger = new Logger(AuthController.name)

  @Get('/info')
  @UseGuards(AuthJwtGuard)
  async getUserInfo(@Req() req: CustomExpressRequest, @Res() res: Response) {
    const jwtData = req.currentUser
    try {
      if (jwtData) {
        const result_user_data = await this.userService.getOneUserById(
          jwtData.id_user,
        )
        if (!result_user_data) {
          throw new InternalServerErrorException({
            message: 'User not found',
          })
        }

        responsesUtils.Success(res, result_user_data)
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('/login')
  @UseInterceptors(FileFieldsInterceptor([]))
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginBodyDto: LoginBodyDto,
  ) {
    const { email, password } = loginBodyDto
    try {
      const result_check: UserEntity | undefined =
        await this.userService.getOneUserByEmail(email)
      if (!result_check) {
        throw new InternalServerErrorException({
          message: 'Login failed',
        })
      }

      const [encrypted_password, salt] = result_check.password.split(':')

      if (encrypted_password === cryptoUtils.encryptWithSalt(password, salt)) {
        const token = this.jwtCustomService.generateToken({
          id_user: result_check.id,
        })

        // Insert token to user token table
        await this.userTokenService.create({
          token: token,
          id_user: result_check.id,
          expiry_date: moment().add(2, 'week').toDate(),
        })

        responsesUtils.Success(res, {
          message: 'Login success',
          token,
        })
      } else {
        throw new InternalServerErrorException({
          message: 'Login failed',
        })
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('/register')
  @UseInterceptors(FileFieldsInterceptor([]))
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() registerBodyDto: RegisterBodyDto,
  ) {
    const qR = this.typeOrmCustomService.createQueryRunner()

    const { email, password, name } = registerBodyDto
    try {
      await qR.startTransaction()
      const result_check_email = await this.userService.getOneUserByEmail(email)
      if (result_check_email) {
        await qR.rollbackTransaction()
        await qR.release()
        throw new InternalServerErrorException({
          message: {
            check_email: result_check_email ? 'Email already used' : null,
          },
        })
      }
      const salt = cryptoUtils.generateSalt()

      const result_register = await this.userService.createSimpleTr(qR, {
        name,
        email,
        hashed_password: `${cryptoUtils.encryptWithSalt(
          password,
          salt,
        )}:${salt}`,
      })
      const token = this.jwtCustomService.generateToken({
        id_user: result_register.identifiers[0].id,
      })

      // Insert token to user token table
      await this.userTokenService.create({
        token: token,
        id_user: result_register.identifiers[0].id,
        expiry_date: moment.tz('Asia/Jakarta').add(2, 'week').toDate(),
      })

      await qR.commitTransaction()
      await qR.release()
      responsesUtils.Success(res, {
        message: 'Register success',
        token,
      })
    } catch (error) {
      await qR.rollbackTransaction()
      await qR.release()
      throw new InternalServerErrorException(error)
    }
  }
}
