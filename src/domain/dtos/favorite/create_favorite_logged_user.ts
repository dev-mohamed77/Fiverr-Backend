import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavoriteLoggedUserDto {
  @IsNotEmpty()
  @IsUUID('4')
  gig: string;
}
