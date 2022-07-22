import moment from 'moment'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string | null

  @Column({ type: 'datetime', default: moment().toDate() })
  created_at: Date

  @Column({ type: 'datetime', default: moment().toDate() })
  updated_at: Date
}
