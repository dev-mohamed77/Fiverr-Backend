import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmDataSource } from 'src/application/core/base/base_typeorm_data_source';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';
import { Conversation } from '../models/conversation';
import { Repository } from 'typeorm';

export class ConversationRepositoryImp
  extends BaseTypeOrmDataSource<ConversationEntity>
  implements IConversationRepository
{
  constructor(
    @InjectRepository(Conversation) repository: Repository<ConversationEntity>,
  ) {
    super(repository);
  }
}
