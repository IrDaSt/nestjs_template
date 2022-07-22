import { Module } from '@nestjs/common'
import { WebController } from './web.controller';

@Module({
  providers: [],
  controllers: [WebController],
})
export class WebModule {}
