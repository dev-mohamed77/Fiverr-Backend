import BaseEntity from 'src/application/core/base/base_entity';
import { UserEntity } from './user.entity';
import SellerEntity from './seller.entity';
import { GigEntity } from './gig.entity';
import { ConversationEntity } from './conversation.entity';
import { Sender } from 'src/application/config/enum/sender';

export class MessageEntity extends BaseEntity {
  conversation: ConversationEntity;
  user: UserEntity;
  seller: SellerEntity;
  message: string;
  sender: Sender;

  constructor(partial: Partial<MessageEntity>) {
    super();
    Object.assign(this, partial);
  }
}
