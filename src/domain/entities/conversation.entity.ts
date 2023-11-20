import BaseEntity from 'src/application/core/base/base_entity';
import { UserEntity } from './user.entity';
import SellerEntity from './seller.entity';

export class ConversationEntity extends BaseEntity {
  user?: UserEntity;
  seller?: SellerEntity;

  constructor(partial: Partial<ConversationEntity>) {
    super();
    Object.assign(this, partial);
  }
}
