import { JwtData } from '@models/models/JwtData.model'
import { Request } from 'express'

export interface CustomExpressRequest extends Request {
  currentUser?: JwtData
  token?: string
}
