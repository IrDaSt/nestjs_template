import { CustomExpressRequest } from '@custom-types/custom-express-request.type'
import { AuthJwtGuard } from '@guards/auth-jwt.guard'
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Put,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { TypeOrmCustomService } from '@services/type-orm-custom/type-orm-custom.service'
import cryptoUtils from '@utilities/crypto.utils'
import fsUtils from '@utilities/fs.utils'
import idGeneratorUtils from '@utilities/id-generator.utils'
import imageProcessingUtils from '@utilities/image-processing.utils'
import responsesUtils from '@utilities/responses.utils'
import { Response } from 'express'
import moment from 'moment'
import sharp from 'sharp'
import prefixApi from '../prefixApi'
import { EditUserBodyDto } from './dto/EditUserBody.dto'
import { UserService } from './user.service'

@Controller(prefixApi.api + 'user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly typeOrmCustomService: TypeOrmCustomService,
  ) {}

  // Edit user example with
  // image splitting example with image-processing.utils.ts
  @Put('/edit')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo' }]))
  @UseGuards(AuthJwtGuard)
  async editUser(
    @Req() req: CustomExpressRequest,
    @Res() res: Response,
    @Body() editUserBodyDto: EditUserBodyDto,
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[]
    },
  ) {
    if (files && files.photo && !files.photo[0].mimetype.startsWith('image')) {
      throw new BadRequestException({
        message: 'file must be an image',
      })
    }

    const qR = this.typeOrmCustomService.createQueryRunner()

    const { email, password, name, description } = editUserBodyDto
    const jwtData = req.currentUser
    try {
      await qR.startTransaction()

      const error_message_email: {
        email?: string
      } = {
        email: undefined,
      }

      const target_edit_user = await this.userService.getOneUserById(
        jwtData.id_user,
      )

      if (email) {
        // Check if email available
        const check_by_email = await this.userService.getOneUserByEmail(email)
        if (check_by_email) error_message_email.email = 'email not available'
      }
      if (error_message_email.email) {
        await qR.rollbackTransaction()
        await qR.release()
        throw new BadRequestException(error_message_email)
      }

      // Handle file upload photo
      let link_foto_photo: string | undefined = undefined
      const list_link_foto_photo: string[] = []
      if (files && files['photo']) {
        await fsUtils.ensureDir('./public/data/uploads/photo')
        link_foto_photo =
          `data/uploads/photo/` +
          `${idGeneratorUtils.generateUUIDV4()}_${moment().format(
            'YYYY-MM-DD',
          )}`

        // resize to smaller parts
        const list_image_break = await imageProcessingUtils.breakToMultiSize({
          file: files['photo'][0],
          output_path_n_name: link_foto_photo,
        })
        list_link_foto_photo.push(...list_image_break)

        // move original file too
        await sharp(
          files['photo'][0].destination + '/' + files['photo'][0].filename,
        )
          .webp()
          .toFile(`./public/${link_foto_photo}.webp`)
        list_link_foto_photo.push(link_foto_photo + `.webp`)
      }

      // Handle edit user in database
      const salt = cryptoUtils.generateSalt()

      const result_edit_user = await this.userService.editTr(qR, {
        id_user: jwtData.id_user,
        email: email,
        hashed_password: `${cryptoUtils.encryptWithSalt(
          password,
          salt,
        )}:${salt}`,
        name: name,
        description: description,
        photo: link_foto_photo,
      })

      // Delete previous profile picture too when edited
      if (target_edit_user?.photo && link_foto_photo) {
        await fsUtils.deleteImagesWithItsBreak({
          filename: target_edit_user?.photo,
        })
      }

      await qR.commitTransaction()
      await qR.release()

      return responsesUtils.Success(res, {
        message: 'Edit success',
      })
    } catch (error) {
      await qR.rollbackTransaction()
      await qR.release()
      throw new InternalServerErrorException(error)
    }
  }
}
