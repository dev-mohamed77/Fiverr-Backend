import { Gender } from '../../../application/config/enum/gender';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLoggedUserDataDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsNumber()
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly country: string;
}
