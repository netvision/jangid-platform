import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  ValidateNested
} from 'class-validator'

class ProfileContactDto {
  @IsOptional()
  @IsEmail()
  email?: string | null

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string | null

  @IsOptional()
  @IsUrl()
  website?: string | null

  @IsOptional()
  @IsString()
  @MaxLength(120)
  address?: string | null
}

class ProfileThemeConfigDto {
  @IsNotEmpty()
  @IsString()
  themeId!: string

  @IsOptional()
  @IsObject()
  config?: Record<string, unknown>
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 80)
  displayName?: string

  @IsOptional()
  @IsString()
  @MaxLength(120)
  headline?: string | null

  @IsOptional()
  @IsString()
  @MaxLength(600)
  summary?: string | null

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  services?: string[]

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileContactDto)
  contact?: ProfileContactDto

  @IsOptional()
  @IsObject()
  sections?: Record<string, unknown>

  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileThemeConfigDto)
  theme?: ProfileThemeConfigDto
}
