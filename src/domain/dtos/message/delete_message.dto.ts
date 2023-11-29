import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { Sender } from 'src/application/config/enum/sender';

export class DeleteMessageDto {
  @IsNotEmpty()
  @IsEnum(Sender)
  sender: Sender;

  @IsNotEmpty()
  @IsUUID('4')
  conversation: string;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;

  @IsNotEmpty()
  @IsUUID('4')
  user: string;
}
