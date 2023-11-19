import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { OccupationEnum } from '../../../application/config/enum/ocupation';

export class CreateOccupationDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly specialization: string;

  @IsNotEmpty()
  @IsEnum(OccupationEnum)
  readonly occupation: OccupationEnum;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;

  @IsNotEmpty()
  @IsString()
  from: Date;

  @IsNotEmpty()
  @IsString()
  to: Date;
}
