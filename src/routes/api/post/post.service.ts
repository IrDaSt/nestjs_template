import { PostEntity } from '@models/entities/pg/Post.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import idGeneratorUtils from '@utilities/id-generator.utils'
import { Repository } from 'typeorm'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity, 'pg_db_template')
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  getAll() {
    return this.postRepository.find()
  }

  create({ title, description }: { title: string; description?: string }) {
    const new_item = new PostEntity()
    new_item.title = title
    if (description !== undefined) new_item.description = description
    return this.postRepository.insert(new_item)
  }
}
