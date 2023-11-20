import { Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import SellerEntity from 'src/domain/entities/seller.entity';
import { Seller } from './seller.model';

@Entity()
export class Conversation extends BaseModel implements ConversationEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  seller: SellerEntity;
}
