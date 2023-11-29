import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { BaseModel } from './base.model';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import SellerEntity from 'src/domain/entities/seller.entity';
import { Seller } from './seller.model';
import { MessageEntity } from 'src/domain/entities/message.entity';
import { Gig } from './gig.model';
import { GigEntity } from 'src/domain/entities/gig.entity';
import { Conversation } from './conversation.model';
import { Sender } from 'src/application/config/enum/sender';
import moment from 'moment-timezone';

@Entity()
export class Message extends BaseModel implements MessageEntity {
  @ManyToOne(() => Conversation, { onDelete: 'CASCADE' })
  conversation: ConversationEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity | null;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  @JoinColumn()
  seller: SellerEntity;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: Sender })
  sender: Sender;
}
