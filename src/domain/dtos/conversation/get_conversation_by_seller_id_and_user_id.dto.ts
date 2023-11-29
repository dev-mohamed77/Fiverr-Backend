import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetConversationByUserIdAndSellerIdDto {
  @IsNotEmpty()
  @IsUUID('4')
  seller: string;

  @IsNotEmpty()
  @IsUUID('4')
  user: string;
}
