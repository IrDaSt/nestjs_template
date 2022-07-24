import { UserEntity } from '@models/entities/mysql/User.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import moment from 'moment'
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

  edit = ({
    id_user,
    name,
    email,
    hashed_password,
    description,
    photo,
  }: {
    id_user: string
    name?: string
    email?: string
    hashed_password?: string
    description?: string
    photo?: string
  }) => {
    const edit_item = new UserEntity()
    if (name !== undefined) edit_item.name = name
    if (email !== undefined) edit_item.email = email
    if (hashed_password !== undefined) edit_item.password = hashed_password
    if (description !== undefined) edit_item.description = description
    if (photo !== undefined) edit_item.photo = photo
    edit_item.updated_at = moment().toDate()
    return this.userRepository.update(
      {
        id: id_user,
      },
      edit_item,
    )
  }

  editTr = (
    qR: QueryRunner,
    {
      id_user,
      name,
      email,
      hashed_password,
      description,
      photo,
    }: {
      id_user: string
      name?: string
      email?: string
      hashed_password?: string
      description?: string
      photo?: string
    },
  ) => {
    const edit_item = new UserEntity()
    if (name !== undefined) edit_item.name = name
    if (email !== undefined) edit_item.email = email
    if (hashed_password !== undefined) edit_item.password = hashed_password
    if (description !== undefined) edit_item.description = description
    if (photo !== undefined) edit_item.photo = photo
    edit_item.updated_at = moment().toDate()
    return qR.manager.getRepository(UserEntity).update(
      {
        id: id_user,
      },
      edit_item,
    )
  }
}
