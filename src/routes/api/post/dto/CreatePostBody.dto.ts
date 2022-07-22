import { IsOptional, IsString } from 'class-validator'

export class CreatePostBodyDto {
  @IsString()
  title: string

  @IsString()
  @IsOptional()
  description: string
}
