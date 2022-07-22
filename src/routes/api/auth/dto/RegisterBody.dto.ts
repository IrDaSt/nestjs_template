import { IsEmail, IsString } from 'class-validator'

export class RegisterBodyDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  name: string
}
