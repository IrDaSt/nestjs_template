import { registerAs } from '@nestjs/config'

export interface PgConfigModel {
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
    host: process.env.PG_DB_HOST || 'localhost',
    user: process.env.PG_DB_USER || 'admin',
    port: Number(process.env.PG_DB_PORT || 5432),
    password: process.env.PG_DB_PASSWORD || 'admin',
    database: process.env.PG_DB_NAME || 'nestjs_template',
  },
})

const PgConfig = registerAs('pg', config)

export default PgConfig
