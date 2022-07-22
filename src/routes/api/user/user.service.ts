import { UserEntity } from '@models/entities/mysql/User.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getOneUserById = (id_user: string) => {
    return this.userRepository.findOne({
      where: {
        id: id_user,
      },
    })
  }

  getOneUserByEmail = (email: string) => {
    return this.userRepository.findOne({
      where: {
        email,
      },
    })
  }

  createSimple = ({
    name,
    email,
    hashed_password,
  }: {
    name: string
    email: string
    hashed_password: string
  }) => {
    return this.userRepository.insert({
      name,
      email,
      password: hashed_password,
    })
  }

  createSimpleTr = (
    qR: QueryRunner,
    {
      name,
      email,
      hashed_password,
    }: {
      name: string
      email: string
      hashed_password: string
    },
  ) => {
    return qR.manager.getRepository(UserEntity).insert({
      name,
      email,
      password: hashed_password,
    })
  }
}
