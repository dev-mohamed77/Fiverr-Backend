import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Gender } from '../../../application/config/enum/gender';
import { Role } from '../../../application/config/enum/roles';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(5, 50)
  readonly email: string;

  @IsOptional()
  @IsString()
  @Length(8, 100)
  readonly password: string;

  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;

  @IsOptional()
  @IsEnum(Role)
  readonly roles: Role;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly country: string;
}
