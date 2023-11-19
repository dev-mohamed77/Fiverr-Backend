import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  readonly displayName: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  readonly picture: string;

  @IsNotEmpty()
  @IsString()
  @Length(200, 1000)
  readonly description: string;

  @IsNotEmpty()
  @IsUUID('4')
  user: string;

  @IsOptional()
  @IsString()
  @Length(2, 255)
  readonly website: string;
}
