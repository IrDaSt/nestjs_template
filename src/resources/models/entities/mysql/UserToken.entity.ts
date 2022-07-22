import moment from 'moment'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from './User.entity'

@Entity('user_token')
export class UserTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  token: string

  @Column({ type: 'datetime', default: moment().toDate() })
  expiry_date: Date

  @Column({ type: 'varchar' })
  id_user: string

  @Column({ type: 'datetime', default: moment().toDate() })
  created_at: Date

  @Column({ type: 'date', default: moment().toDate() })
  updated_at: Date

  @ManyToOne(() => UserEntity, (user) => user.list_user_token)
  @JoinColumn({ name: 'id_user' })
  user_data?: UserEntity
}
