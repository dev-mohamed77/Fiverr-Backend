import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGigImageDto {
  @IsNotEmpty()
  @IsUUID('4')
  gig: string;
}
