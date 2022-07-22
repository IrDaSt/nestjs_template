import { IsEmail, IsString } from 'class-validator'

export class LoginBodyDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
