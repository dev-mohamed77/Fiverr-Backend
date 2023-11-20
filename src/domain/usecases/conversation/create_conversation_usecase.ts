import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';

export class CreateConversationUseCase
  implements IBaseUseCase<ConversationEntity>
{
  constructor(private conversationRepository: IConversationRepository) {}

  execute(params: ConversationEntity): Promise<ConversationEntity> {
    return this.conversationRepository.create(params);
  }
}
