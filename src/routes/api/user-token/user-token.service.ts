import { UserTokenEntity } from '@models/entities/mysql/UserToken.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import moment from 'moment'
import { QueryRunner, Repository } from 'typeorm'

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserTokenEntity)
    private readonly userTokenRepository: Repository<UserTokenEntity>,
  ) {}

  getByTokenAndIdUser = ({
    id_user,
    token,
  }: {
    id_user: string
    token: string
  }) => {
    return this.userTokenRepository.findOne({
      where: {
        id_user,
        token,
      },
    })
  }

  create = ({
    id_user_token,
    token,
    expiry_date,
    id_user,
  }: {
    id_user_token?: string
    token: string
    expiry_date: Date
    id_user: string
  }) => {
    const new_item = new UserTokenEntity()
    if (id_user_token !== undefined) new_item.id = id_user_token
    new_item.token = token
    new_item.expiry_date = expiry_date
    new_item.id_user = id_user
    return this.userTokenRepository.insert(new_item)
  }

  createTr = (
    qR: QueryRunner,
    {
      id_user_token,
      token,
      expiry_date,
      id_user,
    }: {
      id_user_token?: string
      token: string
      expiry_date: Date
      id_user: string
    },
  ) => {
    const new_item = new UserTokenEntity()
    if (id_user_token !== undefined) new_item.id = id_user_token
    new_item.token = token
    new_item.expiry_date = expiry_date
    new_item.id_user = id_user
    return qR.manager.getRepository(UserTokenEntity).insert(new_item)
  }

  remove = (id_user_token: string) => {
    return this.userTokenRepository.delete({
      id: id_user_token,
    })
  }

  removeTr = (qR: QueryRunner, id_user_token: string) => {
    return qR.manager.getRepository(UserTokenEntity).delete({
      id: id_user_token,
    })
  }

  deleteAllUserTokenByIdUserTr = (qR: QueryRunner, id_user: string) => {
    return qR.manager.getRepository(UserTokenEntity).delete({
      id_user,
    })
  }

  deleteAllExpiredUserToken = () => {
    const today = moment()
    return this.userTokenRepository
      .createQueryBuilder('user_token')
      .delete()
      .where(`user_token.expiry_date < date(:today)`, {
        today: today.toDate(),
      })
      .execute()
  }
}
