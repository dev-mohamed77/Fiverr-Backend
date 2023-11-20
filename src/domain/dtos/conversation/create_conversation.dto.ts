import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsUUID('4')
  seller: string;
}
