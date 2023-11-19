import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  readonly fullName: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  readonly displayName: string;

  @IsOptional()
  @IsString()
  @Length(2, 30)
  readonly picture: string;

  @IsOptional()
  @IsString()
  @Length(200, 1000)
  readonly description: string;

  @IsOptional()
  @IsUUID('4')
  user: any;

  @IsOptional()
  @IsUUID('4', { each: true })
  language: any[];

  @IsOptional()
  @IsUUID('4', { each: true })
  occupation: any[];

  @IsOptional()
  @IsUUID('4', { each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  @Length(2, 255)
  readonly website: string;
}
