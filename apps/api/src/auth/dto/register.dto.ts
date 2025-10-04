import { Transform } from 'class-transformer'
import { IsEmail, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email!: string

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string

  @MinLength(8)
  @MaxLength(64)
  password!: string

  @IsString()
  @MinLength(2)
  @MaxLength(80)
  displayName!: string

  @IsString()
  @Length(3, 40)
  @Matches(/^[a-z0-9-]+$/)
  @Transform(({ value }: { value?: string }) => value?.toLowerCase())
  slug!: string

  @IsOptional()
  @IsString()
  categoryId?: string
}
