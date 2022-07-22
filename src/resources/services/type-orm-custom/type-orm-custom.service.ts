import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Injectable()
export class TypeOrmCustomService {
  constructor(
    @InjectDataSource()
    private readonly dataSourceDefault: DataSource,
    @InjectDataSource('pg_db_template')
    private readonly dataSourcePgTemplate: DataSource,
  ) {}

  createQueryRunner = () => {
    return this.dataSourceDefault.createQueryRunner()
  }

  createQueryRunnerPgDbTemplate() {
    return this.dataSourcePgTemplate.createQueryRunner()
  }
}
