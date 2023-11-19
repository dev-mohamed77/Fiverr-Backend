import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateSellerLoggedUserDto {
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

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  language: String[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  occupation: String[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  skills: String[];

  @IsOptional()
  @IsString()
  readonly website: string;
}
