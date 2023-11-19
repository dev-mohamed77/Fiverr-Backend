import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { SkillLevel } from '../../../application/config/enum/skill_level';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly skill: string;

  @IsNotEmpty()
  @IsEnum(SkillLevel)
  readonly level: SkillLevel;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;
}
