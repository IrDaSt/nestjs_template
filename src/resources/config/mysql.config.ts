import { registerAs } from '@nestjs/config'

export interface MysqlConfigModel {
  template: {
    host: string
    user: string
    port: number
    password: string
    database: string
  }
}

const config = () => ({
  template: {
    host: process.env.MYSQL_DB_HOST || 'localhost',
    user: process.env.MYSQL_DB_USER || 'admin',
    port: Number(process.env.MYSQL_DB_PORT || 3306),
    password: process.env.MYSQL_DB_PASSWORD || 'admin',
    database: process.env.MYSQL_DB_NAME || 'nestjs_template',
  },
})

const MysqlConfig = registerAs('mysql', config)

export default MysqlConfig
