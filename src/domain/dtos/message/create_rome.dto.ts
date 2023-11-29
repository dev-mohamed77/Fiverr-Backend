import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsUUID('4')
  user: string;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;
}
