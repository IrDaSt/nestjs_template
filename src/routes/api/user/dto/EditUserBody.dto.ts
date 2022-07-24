import { IsEmail, IsOptional, IsString } from 'class-validator'

export class EditUserBodyDto {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  description: string
}
