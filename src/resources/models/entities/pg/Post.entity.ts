import idGeneratorUtils from '@utilities/id-generator.utils'
import moment from 'moment'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @BeforeInsert()
  generateId() {
    this.id = idGeneratorUtils.generateUUIDV4()
  }

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string | null

  @Column({ type: 'date', default: moment().toDate() })
  created_at: Date

  @Column({ type: 'date', default: moment().toDate() })
  updated_at: Date
}
