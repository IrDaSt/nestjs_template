import moment from 'moment'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserTokenEntity } from './UserToken.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'text', nullable: true })
  description?: string | null

  @Column({ type: 'varchar', nullable: true })
  photo?: string | null

  @Column({ type: 'datetime', default: moment().toDate() })
  created_at: Date

  @Column({ type: 'datetime', default: moment().toDate() })
  updated_at: Date

  @OneToMany(() => UserTokenEntity, (user_token) => user_token.user_data)
  @JoinColumn({ name: 'id' })
  list_user_token?: UserTokenEntity[]
}
