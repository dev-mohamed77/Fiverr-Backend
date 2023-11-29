import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetMessagesByConversationIdDto {
  @IsNotEmpty()
  @IsUUID('4')
  conversation: string;
}
