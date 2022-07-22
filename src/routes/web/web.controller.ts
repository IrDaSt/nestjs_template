import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import prefixWeb from './prefixWeb'

@Controller(prefixWeb.web)
export class WebController {
  constructor() {}

  @Get()
  index(@Req() req: Request, @Res() res: Response) {
    return res.render('pages/index', {
      title: 'Nest JS',
    })
  }
}
