import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateGigDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(50, 1024)
  description: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsUUID('4')
  category: string;

  @IsNotEmpty()
  @IsUUID('4')
  subCategory: string;

  @IsOptional()
  @IsString()
  @Length(5, 255)
  coverImage: string;

  @IsNotEmpty()
  @IsString()
  deliveryTime: string;
}
