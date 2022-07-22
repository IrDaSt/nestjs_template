import { MysqlConfigModel } from '@config/mysql.config'
import { PgConfigModel } from '@config/pg.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmCustomService } from './type-orm-custom.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mysqlConfig = configService.get<MysqlConfigModel>('mysql')
        return {
          type: 'mysql',
          host: mysqlConfig.template.host,
          port: mysqlConfig.template.port,
          username: mysqlConfig.template.user,
          password: mysqlConfig.template.password,
          database: mysqlConfig.template.database,
          entities: [
            __dirname + '/../../models/entities/mysql/*.entity{.ts,.js}',
          ],
          synchronize: false,
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: 'pg_db_template',
      useFactory: (configService: ConfigService) => {
        const pgConfig = configService.get<PgConfigModel>('pg')
        return {
          type: 'postgres',
          host: pgConfig.template.host,
          port: pgConfig.template.port,
          username: pgConfig.template.user,
          password: pgConfig.template.password,
          database: pgConfig.template.database,
          entities: [__dirname + '/../../models/entities/pg/*.entity{.ts,.js}'],
          synchronize: false,
          uuidExtension: 'uuid-ossp',
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TypeOrmCustomService],
  exports: [TypeOrmCustomService],
})
export class TypeOrmCustomModule {}
