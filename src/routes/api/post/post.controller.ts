import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import responsesUtils from '@utilities/responses.utils'
import { Request, Response } from 'express'
import prefixApi from '../prefixApi'
import { CreatePostBodyDto } from './dto/CreatePostBody.dto'
import { PostService } from './post.service'

@Controller(prefixApi.api + 'post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPost(@Req() req: Request, @Res() res: Response) {
    try {
      const list_post = await this.postService.getAll()
      return responsesUtils.Success(res, list_post)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([]))
  async createPost(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPostBodyDto: CreatePostBodyDto,
  ) {
    const { title, description } = createPostBodyDto
    try {
      await this.postService.create({
        title,
        description,
      })
      return responsesUtils.Created(res, {
        message: 'Insert success',
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
