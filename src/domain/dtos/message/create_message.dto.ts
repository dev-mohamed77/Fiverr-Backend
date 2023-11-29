import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Sender } from 'src/application/config/enum/sender';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(Sender)
  sender: Sender;

  @IsNotEmpty()
  @IsUUID('4')
  conversation: string;

  @IsNotEmpty()
  @IsUUID('4')
  user: string;

  @IsNotEmpty()
  @IsUUID('4')
  seller: string;
}
