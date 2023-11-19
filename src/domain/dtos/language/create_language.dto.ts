import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { LanguageLevel } from '../../../application/config/enum/language_level';

export class CreateLanguageDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly language: string;

  @IsNotEmpty()
  @IsEnum(LanguageLevel)
  readonly level: LanguageLevel;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;
}
