import { registerAs } from '@nestjs/config'

export interface ServerConfigModel {
  node_env: string
  base_url: string
  port: number
  secret_token: string
  session_secret_key: string
  session_setting: {
    cookie: {
      maxAge: number
    }
    saveUninitialized: boolean
    resave: boolean
    secret: string
  }
  cookie_config: {
    domain: string
    path: string
  }
}

const config = () => ({
  node_env: process.env.NODE_ENV ?? 'development',
  base_url: process.env.BASE_URL ?? '',
  port: Number(process.env.PORT || '4000'),
  secret_token: process.env.JWT_SECRET || 'secret_token_express_fullstack',
  session_secret_key:
    process.env.SESSION_SECRET || 'secret_session_key_express_fullstack',
  session_setting: {
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // a day in milliseconds
    // store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: true,
    secret:
      process.env.SESSION_SECRET || 'secret_session_key_express_fullstack',
  },
  cookie_config: {
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    path: '/',
  },
})

const ServerConfig = registerAs('server', config)

export default ServerConfig
