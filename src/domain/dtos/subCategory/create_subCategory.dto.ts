import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 255)
  name: string;

  @IsNotEmpty()
  @IsUUID('4')
  category: string;
}
