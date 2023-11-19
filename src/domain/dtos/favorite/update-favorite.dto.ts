import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteDto } from './create-favorite.dto';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateFavoriteDto {
  @IsOptional()
  @IsUUID('4')
  user: string;

  @IsNotEmpty()
  @IsUUID('4')
  gig: string;
}
