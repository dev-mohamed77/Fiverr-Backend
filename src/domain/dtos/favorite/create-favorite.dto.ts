import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsUUID('4')
  user: string;

  @IsNotEmpty()
  @IsUUID('4')
  gig: string;
}
