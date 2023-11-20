import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { IConversationRepository } from 'src/domain/repositories/conversation.repository';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';

export class DeleteOneConversationUseCase implements IBaseUseCase<boolean> {
  constructor(private conversationRepository: IConversationRepository) {}

  execute(filter: Partial<ConversationEntity>): Promise<boolean> {
    return this.conversationRepository.deleteOne(filter);
  }
}
