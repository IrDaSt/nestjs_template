import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from '@models/entities/pg/Post.entity'

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [TypeOrmModule.forFeature([PostEntity], 'pg_db_template')],
  exports: [PostService],
})
export class PostModule {}
